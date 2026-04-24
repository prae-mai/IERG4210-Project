import { BASE_API_URL, ORDERS_BASE_URL } from "../config/apiConfig";

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

export async function updateOrder(orderId, data) {
	const res = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
		method: "PUT",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to update order");
	}

	return await res.json();
}

export async function deleteOrder(orderId) {
	const res = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!res.ok) {
		const data = await res.json().catch(() => ({}));
		const err = new Error(data.message || "Failed to delete order");
		err.code = data.error;
		throw err;
	}

	return await res.json();
}

export async function getOrders() {
	const res = await fetch(ORDERS_BASE_URL, {
		credentials: "include",
	});

	const text = await res.text();
	let data;

	try {
		data = text ? JSON.parse(text) : [];
	} catch {
		throw new Error("Server returned invalid JSON");
	}

	if (!res.ok) {
		throw new Error(data.error || "Failed to fetch orders");
	}

	return data;
}

export async function getOrderById(orderId) {
	const res = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
		credentials: "include",
	});

	const text = await res.text();
	let data;

	try {
		data = text ? JSON.parse(text) : null;
	} catch {
		throw new Error("Server returned invalid JSON");
	}

	if (!res.ok) {
		throw new Error(data.error || "Failed to fetch order");
	}

	return data;
}