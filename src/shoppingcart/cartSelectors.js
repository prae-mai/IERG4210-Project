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

export function selectPreviewItems(cartState, limit = 3) {
	return cartState.items.slice(0, limit);
}

export function selectNumberOfHiddenitems(cartState) {
	return cartState.items.length - 3;
}

export function selectIsCartEmpty(cartState) {
	return cartState.items.length === 0;
}
