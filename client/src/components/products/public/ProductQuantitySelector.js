import { useState, useEffect } from "react";
import { useCart } from "../../../shoppingcart/useCart";

import ENGLISH from "../../../i18n/english";

function ProductQuantitySelector({ product }) {
	const { addItem, setQuantity, isLocked, getItemQuantity } = useCart();
	const existingQuantity = getItemQuantity(product.id);

	const [value, setValue] = useState(existingQuantity || 1);
	const [justUpdated, setJustUpdated] = useState(false);

	useEffect(() => {
		if (existingQuantity > 0) {
			setValue(existingQuantity);
		}
	}, [existingQuantity]);

	function handleAdd() {
		if (existingQuantity > 0) {
			setQuantity(product.id, value);
		}
		else {
			addItem(product, value);
		}
	}

	return (
		<div className="product-quantity-selector">
			<input
				type="number"
				min="1"
				value={value}
				onChange={(e) => setValue(Number(e.target.value))}
				disabled={isLocked}
			/>

			<button onClick={handleAdd} disabled={isLocked}>
				{existingQuantity > 0 ? `${ENGLISH.CART.ACTIONS.UPDATE_QUANTITY}` : `${ENGLISH.CART.ACTIONS.ADD}`}
			</button>
		</div>
	);
}

export default ProductQuantitySelector;
