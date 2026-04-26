import { validateId } from "../utils/validators.js";

import Stripe from "stripe";

import * as ordersService from "../services/ordersService.js";
import * as paymentsService from "../services/paymentsService.js";

export async function create(req, res) {
	try {
		const { items } = req.body;

		if (!Array.isArray(items) || items.length === 0) {
			throw new Error("Order must contain items");
		}

		const validatedItems = items.map((item) => {
			const pid = validateId(item.pid, "product id");
			const quantity = Number(item.quantity);

			if (!Number.isInteger(quantity) || quantity <= 0) {
				throw new Error("Invalid quantity");
			}

			return { pid, quantity };
		});

		if (!req.user) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		const result = await ordersService.createOrder({
			userId: req.user.id,
			items: validatedItems,
		});

		res.status(201).json({
			message: "Order created",
			orderId: result.orderId,
			digest: result.digest,
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
}

export async function getAll(req, res) {
	try {
		const orders = await ordersService.getAllOrders();
		res.json(orders);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch orders" });
	}
}

export async function getById(req, res) {
	try {
		const id = validateId(req.params.id, "order id");

		const order = await ordersService.getOrderById(id);

		if (!order) {
			return res.status(404).json({ error: "Order not found" });
		}

		res.json(order);
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
}

export async function createCheckoutSession(req, res) {
	try {
		const { items } = req.body;

		if (!Array.isArray(items) || items.length === 0) {
			throw new Error("Order must contain items");
		}

		const validatedItems = items.map((item) => {
			const pid = validateId(item.pid, "product id");
			const quantity = Number(item.quantity);

			if (!Number.isInteger(quantity) || quantity <= 0) {
				throw new Error("Invalid quantity");
			}

			return { pid, quantity };
		});

		if (!req.user) {
			return res.status(401).json({ error: "You are not logged in" });
		}

		const order = await ordersService.createOrder({
			userId: req.user.id,
			items: validatedItems,
		});

		const session = await paymentsService.createCheckoutSession({
			order,
		});

		res.status(201).json({
			checkoutUrl: session.url,
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err.message });
	}
}

export async function handleStripeWebhook(req, res) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			req.rawBody,
			req.headers["stripe-signature"],
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		console.error("Webhook signature verification failed:", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	try {
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			const orderId = Number(session.metadata.orderId);
			const digest = session.metadata.digest;

			await ordersService.processSuccessfulPayment({
				orderId,
				digest,
				stripeSessionId: session.id,
				stripePaymentIntentId: session.payment_intent,
			});
		}

		res.json({ received: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Webhook processing failed" });
	}
}