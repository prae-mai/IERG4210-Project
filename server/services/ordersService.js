import { dbQuery } from "../utils/dbQuery.js";
import { CART_LIMITS } from "../config/shoppingCartConfig.js";
import { CURRENCY, MERCHANT_EMAIL } from "../config/paymentConfig.js";

import crypto from "crypto";

export async function createOrder({ userId, items }) {
	for (const item of items) {
		if (
			!Number.isInteger(item.quantity) ||
			item.quantity < CART_LIMITS.MIN_QUANTITY_PER_ITEM ||
			item.quantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM
		) {
			throw new Error("Invalid quantity");
		}
	}

	const pids = items.map((item) => item.pid);

	const placeholders = pids.map(() => "?").join(",");
	const rows = await dbQuery(
		`SELECT pid, price FROM products WHERE pid IN (${placeholders})`,
		pids,
	);

	const productMap = new Map(rows.map((row) => [row.pid, Number(row.price)]));

	for (const pid of pids) {
		if (!productMap.has(pid)) {
			throw new Error(`Product not found: ${pid}`);
		}
	}

	const itemsWithPrice = items.map((item) => ({
		pid: item.pid,
		quantity: item.quantity,
		price: productMap.get(item.pid),
	}));

	const totalPrice = itemsWithPrice.reduce((sum, item) => {
		return sum + item.price * item.quantity;
	}, 0);

	const normalizedTotalPrice = Number(totalPrice.toFixed(2));

	const randomSalt = crypto.randomBytes(16).toString("hex");

	const sortedItems = [...itemsWithPrice].sort((a, b) => a.pid - b.pid);

	const itemsString = sortedItems
		.map((item) => `${item.pid}:${item.quantity}:${item.price.toFixed(2)}`)
		.join("|");

	const digestString = [
		CURRENCY,
		MERCHANT_EMAIL,
		randomSalt,
		itemsString,
		normalizedTotalPrice.toFixed(2),
	].join("|");

	const digest = crypto
		.createHash("sha256")
		.update(digestString)
		.digest("hex");

	const cartContent = JSON.stringify(itemsWithPrice);

	const result = await dbQuery(
		`INSERT INTO orders
		(userid, currency, merchantemailaddress, randomsalt, cartcontent, totalprice)
		VALUES (?, ?, ?, ?, ?, ?)`,
		[
			userId,
			CURRENCY,
			MERCHANT_EMAIL,
			randomSalt,
			cartContent,
			normalizedTotalPrice,
		],
	);

	return {
		orderId: Number(result.insertId),
		digest,
		randomSalt,
		currency,
		merchantEmail,
		itemsWithPrice,
		totalPrice: normalizedTotalPrice,
	};
}

export async function getAllOrders() {
	// newest orders first
	const rows = await dbQuery(`SELECT * FROM orders ORDER BY orderid DESC`);
	return rows.map(mapOrderRow);
}

export async function getOrderById(orderId) {
	const rows = await dbQuery(`SELECT * FROM orders WHERE orderid = ?`, [
		orderId,
	]);

	if (rows.length === 0) {
		return null;
	}

	return mapOrderRow(rows[0]);
}

export async function getOrdersByUser(userId) {
	const rows = await dbQuery(
		`SELECT * FROM orders WHERE userid = ? ORDER BY orderid DESC LIMIT 5`,
		[userId]
	);
	
	return rows.map(mapOrderRow);
}

function mapOrderRow(row) {
	return {
		id: row.orderid,
		userId: row.userid,
		currency: row.currency,
		merchantEmailAddress: row.merchantemailaddress,
		randomSalt: row.randomsalt,
		cartcontent: row.cartcontent,
		totalPrice: Number(row.totalprice),
		status: row.status,
		stripeSessionId: row.stripe_session_id,
		stripePaymentIntentId: row.stripe_payment_intent_id,
		processedAt: row.processed_at,
	};
}

export async function processSuccessfulPayment({
	orderId,
	digest,
	stripeSessionId,
	stripePaymentIntentId,
}) {
	const rows = await dbQuery(`SELECT * FROM orders WHERE orderid = ?`, [
		orderId,
	]);

	if (rows.length === 0) {
		throw new Error("Order not found");
	}

	const order = rows[0];

	if (order.status === "paid") {
		return;
	}

	if (!stripeSessionId) {
		throw new Error("Missing Stripe session ID");
	}

	const recomputedDigest = computeDigestFromOrderRow(order)

	if (recomputedDigest !== digest) {
		throw new Error("Digest mismatch, possible tampering");
	}

	await dbQuery(
		`UPDATE orders
		 SET status = 'paid',
		     stripe_session_id = ?,
		     stripe_payment_intent_id = ?,
		     processed_at = NOW()
		 WHERE orderid = ?`,
		[stripeSessionId, stripePaymentIntentId, orderId],
	);
}

function computeDigestFromOrderRow(row) {
	const cartItems = JSON.parse(row.cartcontent);

	const sortedItems = [...cartItems].sort((a, b) => a.pid - b.pid);

	const itemsString = sortedItems
		.map((item) => `${item.pid}:${item.quantity}:${item.price.toFixed(2)}`)
		.join("|");

	const digestString = [
		row.currency,
		row.merchantemailaddress,
		row.randomsalt,
		itemsString,
		Number(row.totalprice).toFixed(2),
	].join("|");

	const recomputedDigest = crypto
		.createHash("sha256")
		.update(digestString)
		.digest("hex");

	return recomputedDigest;
}

export async function markOrderFailed(orderId) {
	await dbQuery(
		`UPDATE orders
		 SET status = 'failed',
			processed_at = NOW()
		 WHERE orderid = ? AND status = 'pending'`,
		 [orderId]
	);
}