import { CART_PREVIEW_LIMIT } from "../config/shoppingCartConfig";

export function selectAllCartItems(cartState) {
	return cartState.items;
}

export function selectTotalItemCount(cartState) {
	return cartState.items.reduce((total, item) => total + item.quantity, 0);
}

export function selectTotalPrice(cartState) {
	return cartState.items.reduce(
		(total, item) => total + item.quantity * item.priceSnapshot,
		0,
	);
}

export function selectPreviewItems(cartState) {
	return cartState.items.slice(0, CART_PREVIEW_LIMIT);
}

export function selectNumberOfHiddenitems(cartState) {
	return Math.max(0, cartState.items.length - CART_PREVIEW_LIMIT);
}

export function selectIsCartEmpty(cartState) {
	return cartState.items.length === 0;
}

export function selectItemQuantityByProductId(cartState, productId) {
	const item = cartState.items.find((item) => item.productId === productId);
	return item ? item.quantity : 0;
}