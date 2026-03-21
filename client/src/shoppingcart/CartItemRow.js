import { useState, useEffect } from "react";
import { CART_LIMITS } from "../config/shoppingCartConfig";

import ENGLISH from "../i18n/english";

function CartItemRow({ cartItem, isLocked, setQuantity, removeItem }) {
	const [value, setValue] = useState(cartItem.quantity);

	useEffect(() => {
		setValue(cartItem.quantity);
	}, [cartItem.quantity]);

	return (
		<li className="cart-item-row">
			<strong className="cart-item-row__name">{cartItem.name}</strong>
			<div className="cart-item-row__controls">
				<input
					type="number"
					value={value}
					min={CART_LIMITS.MIN_QUANTITY_PER_ITEM}
					max={CART_LIMITS.MAX_QUANTITY_PER_ITEM}
					onChange={(e) => setValue(Number(e.target.value))}
					disabled={isLocked}
				/>
				<button
					onClick={() => setQuantity(cartItem.productId, value)}
					disabled={isLocked}
				>
					{ENGLISH.CART.ACTIONS.UPDATE}
				</button>
				<button
					onClick={() => removeItem(cartItem.productId)}
					disabled={isLocked}
				>
					{ENGLISH.CART.ACTIONS.REMOVE}
				</button>
			</div>
		</li>
	);
}

export default CartItemRow;