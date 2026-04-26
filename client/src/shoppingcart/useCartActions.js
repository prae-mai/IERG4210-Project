import { useContext } from "react";
import { CartContext } from "./CartContext";
import { createCartItem } from "./createCartItem";
import { isValidQuantity, parseQuantity } from "./cartValidation";
import { CART_ACTIONS, CART_LIMITS } from "../config/shoppingCartConfig";
import { createOrder } from "../api/ordersApi";

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

	async function checkout(orderItems) {
		if (!orderItems || orderItems.length === 0) {
			alert(ENGLISH.CART.ERROR.EMPTY_ON_CHECKOUT);
			return;
		}

		for (const item of orderItems) {
			if (
				!Number.isInteger(item.productId) ||
				item.productId <= 0 ||
				!isValidQuantity(item.quantity)
			) {
				alert(ENGLISH.CART.ERROR.INVALID_QUANTITY);
				return;
			}
		}

		dispatch({ type: CART_ACTIONS.LOCK_CART });

		try {
			const result = await createOrder(orderItems);

			if (result?.checkoutUrl) {
				window.location.href = result.checkoutUrl;
				return;
			}

			dispatch({ type: CART_ACTIONS.CLEAR_CART });
			alert(
				`${ENGLISH.CART.STATUS.CHECKOUT_SUCCESSFUL}\n` +
				`Order ID: ${result.orderId}`
			);
		} catch (err) {
			console.error(err);
			alert(err.message || "Checkout failed");
			dispatch({ type: CART_ACTIONS.UNLOCK_CART });
		}
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