const BASE_URL = "http://localhost:5000/api/categories";

export async function createCategory(data) {
	const res = await fetch(BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to create category");
	}

	return await res.json();
}

export async function updateCategory(catid, data) {
	const res = await fetch(`${BASE_URL}/${catid}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to update category");
	}

	return await res.json();
}

export async function deleteCategory(catid) {
	const res = await fetch(`${BASE_URL}/${catid}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete category");
	}

	return await res.json();
}
