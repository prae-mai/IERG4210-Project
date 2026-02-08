import { useContext } from "react";
import { CartContext } from "./CartContext";
import { CART_ACTIONS, CART_LIMITS } from "../config/shoppingCartConfig";

import ENGLISH from "../i18n/english";

export function useCartActions() {
	const { cartState, dispatch } = useContext(CartContext);

	function setQuantity(product, value) {
		const quantity = Number(value);

		if (
			!Number.isInteger(quantity) ||
			quantity < CART_LIMITS.MIN_QUANTITY_PER_ITEM ||
			quantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM
		) {
			alert(ENGLISH.CART.ERROR.INVALID_QUANTITY);
			return false;
		}

		dispatch({
			type: CART_ACTIONS.SET_QUANTITY,
			payload: { product, quantity },
		});

		return true;
	}

	function removeItem(productId) {
		dispatch({
			type: CART_ACTIONS.REMOVE_ITEM,
			payload: { productId },
		});
	}

	function clearCart() {
		dispatch({ type: CART_ACTIONS.CLEAR_CART });
	}

	function checkout(items) {
		if (items.length === 0) {
			alert(ENGLISH.CART.ERROR.EMPTY_ON_CHECKOUT);
			return;
		}

		dispatch({ type: CART_ACTIONS.LOCK_CART });
		alert(ENGLISH.CART.STATUS.CHECKOUT_SUCCESSFUL);
	}

	function unlockCart() {
		dispatch({ type: CART_ACTIONS.UNLOCK_CART });
	}

	return {
		isLocked: cartState.isCheckoutLocked,
		setQuantity,
		removeItem,
		clearCart,
		checkout,
		unlockCart,
	};
}