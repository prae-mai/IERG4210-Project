import ENGLISH from "../i18n/english";

export function normalizeProductInput(raw) {
	return {
		name: raw.name?.trim() || "",
		description: raw.description?.trim() || "",
		price: raw.price === "" ? "" : String(raw.price).trim(),
		categoryId: raw.categoryId === "" ? "" : Number(raw.categoryId),
		imageFile: raw.imageFile || null,
	};
}

export function validateProductInput(product, { isEdit = false }) {
	const errors = {};

	if (!product.name) {
		errors.name = ENGLISH.REQUIRED.NAME;
	}

	if (product.name && product.name.length > 200) {
		errors.name = ENGLISH.TOO_LONG.PRODUCT_NAME;
	}

	if (
		product.price === "" ||
		!Number.isFinite(Number(product.price)) ||
		Number(product.price) <= 0
	) {
		errors.price = ENGLISH.PRODUCT.PRICE_MUST_BE_POSITIVE;
	}
	else if (product.price && !/^\d+(\.\d{1,2})?$/.test(String(product.price))) {
		errors.price = ENGLISH.PRODUCT.TWO_DECIMAL_PLACES;
	}

	if (!Number.isInteger(product.categoryId) || product.categoryId <= 0) {
		errors.categoryId = ENGLISH.REQUIRED.CATEGORY;
	}

	if (!product.description) {
		errors.description = ENGLISH.REQUIRED.DESCRIPTION;
	}

	if (product.description && product.description.length > 1000) {
		errors.description = ENGLISH.TOO_LONG.DESCRIPTION;
	}

	if (!isEdit && !product.imageFile) {
		errors.imageFile = ENGLISH.REQUIRED.IMAGE;
	}

	return errors;
}
