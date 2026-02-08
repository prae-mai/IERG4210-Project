export const CART_ACTIONS = {
	SET_QUANTITY: "cart/setQuantity",
	REMOVE_ITEM: "cart/removeItem",
	CLEAR_CART: "cart/clearCart",
	LOCK_CART: "cart/lockCart",
	UNLOCK_CART: "cart/unlockCart",
};

export const CART_LIMITS = {
	MAX_QUANTITY_PER_ITEM: 100,
	MIN_QUANTITY_PER_ITEM: 1,
};

export const CART_PREVIEW_LIMIT = 3;