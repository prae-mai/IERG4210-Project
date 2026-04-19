import { BASE_API_URL } from "../../../shared/config/apiConfig";

const ORDERS_BASE_URL = `${BASE_API_URL}/api/orders`;

export async function createOrder(cartItems) {
	const payload = {
		items: cartItems.map(({ productId, quantity }) => ({
			pid: productId,
			quantity,
		})),
	};

	const response = await fetch(ORDERS_BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(payload),
	});

	let data;
	const text = await response.text();

	try {
		data = text ? JSON.parse(text) : {};
	} catch {
		throw new Error("Server returned invalid JSON");
	}

	if (!response.ok) {
		throw new Error(data.error || "Failed to create order");
	}

	return data;
}
