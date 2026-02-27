import { useContext } from "react";
import { CartContext } from "./CartContext";
import * as selectors from "./cartSelectors";
import { useCartActions } from "./useCartActions";

export function useCart() {
	const { cartState } = useContext(CartContext);
	const actions = useCartActions();

	return {
		// state-derived values
		getItemQuantity: (productId) => selectors.selectItemQuantityByProductId(cartState, productId),
		totalPrice: selectors.selectTotalPrice(cartState),
		isEmpty: selectors.selectIsCartEmpty(cartState),

		isLocked: cartState.isCheckoutLocked,

		// actions
		...actions,
	};
}
