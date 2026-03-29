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

	const price = Number.parseFloat(data.price);
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

	if (description.length > 1000) {
		throw new Error("Description too long");
	}

	if (!Number.isFinite(price) || price <= 0) {
		throw new Error("Invalid price");
	}

	// enforce 2 decimal places for price
	if (!/^\d+(\.\d{1,2})?$/.test(String(data.price))) {
		throw new Error("Price can only have up to 2 decimal places");
	}

	return {
		name,
		description,
		price,
		categoryId,
	};
}

export function validateUsername(username) {
	const clean = sanitizeString(username);

	if (!clean) {
		throw new Error("Username is required");
	}

	if (clean.length < 3 || clean.length > 20) {
		throw new Error("Username must be between 3 and 20 characters");
	}

	return clean;
}

export function validatePassword(password) {
	if (typeof password !== "string") {
		throw new Error("Password is required");
	}

	if (password.length < 8 || password.length > 100) {
		throw new Error("Password must be between 8 and 100 characters");
	}

	return password;
}

export function validateEmail(email) {
	const clean = sanitizeString(email);

	if (!clean) {
		throw new Error("Email is required");
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(clean)) {
		throw new Error("Invalid email format");
	}

	if (clean.length > 255) {
		throw new Error("Email too long");
	}

	return clean;
}