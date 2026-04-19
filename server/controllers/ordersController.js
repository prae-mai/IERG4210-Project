import { validateId } from "../utils/validators.js";

import * as ordersService from "../services/ordersService.js";

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
