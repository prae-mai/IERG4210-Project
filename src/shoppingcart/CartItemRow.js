import { useState, useEffect } from "react";
import { CART_LIMITS } from "../config/shoppingCartConfig";

import ENGLISH from "../i18n/english";

function CartItemRow({ item, isLocked, setQuantity, removeItem }) {
	const [value, setValue] = useState(item.quantity);

	useEffect(() => {
		setValue(item.quantity);
	}, [item.quantity]);

	return (
		<li className="cart-item-row">
			<strong className="cart-item-row__name">{item.name}</strong>
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
					onClick={() => setQuantity(item, value)}
					disabled={isLocked}
				>
					{ENGLISH.CART.ACTIONS.UPDATE}
				</button>
				<button
					onClick={() => removeItem(item.productId)}
					disabled={isLocked}
				>
					{ENGLISH.CART.ACTIONS.REMOVE}
				</button>
			</div>
		</li>
	);
}

export default CartItemRow;