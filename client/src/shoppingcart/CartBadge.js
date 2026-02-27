import { useContext } from "react";
import { CartContext } from "./CartContext";
import { selectTotalItemCount, selectTotalPrice } from "./cartSelectors";

import ENGLISH from "../i18n/english";

function CartBadge({ onClick }) {
	const { cartState } = useContext(CartContext);
	const itemCount = selectTotalItemCount(cartState);
	const totalPrice = selectTotalPrice(cartState);

	return (
		<button
			type="button"
			className="cart-badge"
			aria-label={`Shopping cart with ${itemCount} items`}
			onClick={onClick}
		>
			<span>{ENGLISH.CART.SHORT_TITLE}</span>
			{totalPrice > 0 && (
				<span className="cart-badge__count">${totalPrice.toFixed(2)}</span>
			)}
		</button>
	);
}

export default CartBadge;