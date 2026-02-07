import { useContext } from "react";
import { CartContext } from "./CartContext";
import { selectTotalItemCount, selectTotalPrice } from "./cartSelectors";

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
			<span>Cart</span>
			{totalPrice > 0 && (
				<span className="cart-badge__count">${totalPrice}</span>
			)}
		</button>
	);
}

export default CartBadge;