import { useState, useEffect } from "react";
import { useCart } from "../shoppingcart/useCart";

import ENGLISH from "../i18n/english";

function ProductQuantitySelector({ product }) {
	const { setQuantity, isLocked, getItemQuantity } = useCart();
	const existingQuantity = getItemQuantity(product.id);

	const [value, setValue] = useState(existingQuantity || 1);
	const [justUpdated, setJustUpdated] = useState(false);

	useEffect(() => {
		if (existingQuantity > 0) {
			setValue(existingQuantity);
		}
	}, [existingQuantity]);

	function handleAdd() {
		setQuantity(product, value);

		if (value !== existingQuantity) {
			setJustUpdated(true);
			setTimeout(() => setJustUpdated(false), 1500);
		}
	}

	return (
		<div className="product-quantity-selector">
			<input
				type="number"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={isLocked}
			/>

			<button onClick={handleAdd} disabled={isLocked}>
				{existingQuantity > 0 ? `${ENGLISH.CART.ACTIONS.UPDATE_QUANTITY}` : `${ENGLISH.CART.ACTIONS.ADD}`}
			</button>
		</div>
	);
}

export default ProductQuantitySelector;
