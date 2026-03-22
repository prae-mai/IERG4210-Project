import { CART_LIMITS } from "../config/shoppingCartConfig";

export function isValidQuantity(value) {
	const quantity = Number(value);

	return (
		Number.isInteger(quantity) &&
		quantity >= CART_LIMITS.MIN_QUANTITY_PER_ITEM &&
		quantity <= CART_LIMITS.MAX_QUANTITY_PER_ITEM
	);
}

export function parseQuantity(value) {
	return Number(value);
}
