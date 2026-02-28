import { PRODUCTS_BASE_URL } from "../config/apiConfig";

export async function createProduct(data) {
	const res = await fetch(PRODUCTS_BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to create product");
	}

	return await res.json();
}

export async function updateProduct(pid, data) {
	const res = await fetch(`${PRODUCTS_BASE_URL}/${pid}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to update product");
	}

	return await res.json();
}

export async function deleteProduct(pid) {
	const res = await fetch(`${PRODUCTS_BASE_URL}/${pid}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete product");
	}

	return await res.json();
}
