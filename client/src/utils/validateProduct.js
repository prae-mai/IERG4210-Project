import ENGLISH from "../i18n/english";

export function normalizeProductInput(raw) {
	return {
		name: raw.name?.trim() || "",
		description: raw.description?.trim() || "",
		price: raw.price === "" ? "" : Number(raw.price),
		categoryId: raw.categoryId === "" ? "" : Number(raw.categoryId),
		imageFile: raw.imageFile || null,
	};
}

export function validateProductInput(product) {
	const errors = {};

	if (!product.name) {
		errors.name = ENGLISH.REQUIRED.NAME;
	}

	if (
		product.price === "" ||
		!Number.isFinite(product.price) ||
		product.price <= 0
	) {
		errors.price = ENGLISH.PRODUCT.PRICE_MUST_BE_POSITIVE;
	}

	if (!Number.isInteger(product.categoryId) || product.categoryId <= 0) {
		errors.categoryId = ENGLISH.REQUIRED.CATEGORY;
	}

	if (!product.description) {
		errors.description = ENGLISH.REQUIRED.DESCRIPTION;
	}

	if (!product.imageFile) {
		errors.imageFile = ENGLISH.REQUIRED.IMAGE;
	}

	return errors;
}
