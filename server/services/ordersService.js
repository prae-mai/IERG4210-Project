import { dbQuery } from "../utils/dbQuery.js";
import { CART_LIMITS } from "../../shared/config/shoppingCartConfig.js";

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
		`SELECT pid FROM products WHERE pid IN (${placeholders})`,
		pids,
	);

	const existingPids = new Set(rows.map((row) => row.pid));

	for (const pid of pids) {
		if (!existingPids.has(pid)) {
			throw new Error(`Product not found: ${pid}`);
		}
	}
	return {
		orderId: null,
		digest: null,
	};
}
