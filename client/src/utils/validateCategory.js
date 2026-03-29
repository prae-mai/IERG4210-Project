import ENGLISH from "../i18n/english";

export function normalizeCategoryInput(raw) {
	return {
		name: raw.name?.trim() || "",
	};
}

export function validateCategoryInput(category) {
	const errors = {};

	if (!category.name) {
		errors.name = ENGLISH.REQUIRED.NAME;
	}

	if (category.name.length > 100) {
		errors.name = ENGLISH.TOO_LONG.CATEGORY_NAME;
	}

	return errors;
}
