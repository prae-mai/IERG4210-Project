export function sanitizeString(value) {
	if (typeof value !== "string") return "";
	return value.trim();
}

export function validateId(value, fieldName = "id") {
	const num = Number(value);

	if (!Number.isInteger(num) || num <= 0) {
		throw new Error(`Invalid ${fieldName}`);
	}

	return num;
}

export function validateCategoryName(name) {
	const clean = sanitizeString(name);

	if (!clean) {
		throw new Error("Name is required");
	}

	if (clean.length > 100) {
		throw new Error("Name too long");
	}

	return clean;
}

export function validateProductInput(data) {
	const name = sanitizeString(data.name);
	const description = sanitizeString(data.description);

	const price = Number(data.price);
	const categoryId = validateId(data.categoryId, "categoryId");

	if (!name) {
		throw new Error("Name is required");
	}

	if (name.length > 255) {
		throw new Error("Name too long");
	}

	if (!description) {
		throw new Error("Description required");
	}

	if (!Number.isFinite(price) || price <= 0) {
		throw new Error("Invalid price");
	}

	if (description.length > 2000) {
		throw new Error("Description too long");
	}

	return {
		name,
		description,
		price,
		categoryId,
	};
}