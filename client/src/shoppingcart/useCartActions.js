import { useContext } from "react";
import { CartContext } from "./CartContext";
import { createCartItem } from "./createCartItem";
import { isValidQuantity, parseQuantity } from "./cartValidation";
import { CART_ACTIONS, CART_LIMITS } from "../config/shoppingCartConfig";

import ENGLISH from "../i18n/english";

export function useCartActions() {
	const { cartState, dispatch } = useContext(CartContext);

	function addItem(product, quantity = 1) {
		if (!isValidQuantity(quantity)) {
			alert(ENGLISH.CART.ERROR.INVALID_QUANTITY);
			return false;
		}

		const parsedQuantity = parseQuantity(quantity);
		const item = createCartItem(product, parsedQuantity);
		dispatch({
			type: CART_ACTIONS.ADD_ITEM,
			payload: { item },
		});

		return true;
	}

	function setQuantity(productId, value) {
		if (!isValidQuantity(value)) {
			alert(ENGLISH.CART.ERROR.INVALID_QUANTITY);
			return false;
		}

		const quantity = parseQuantity(value);

		dispatch({
			type: CART_ACTIONS.SET_QUANTITY,
			payload: { productId, quantity },
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
		isValidQuantity,
		addItem,
		setQuantity,
		removeItem,
		clearCart,
		checkout,
		unlockCart,
	};
}