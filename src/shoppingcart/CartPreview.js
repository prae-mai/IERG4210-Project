import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "./CartContext";
import { selectPreviewItems, selectTotalPrice, selectIsCartEmpty, selectNumberOfHiddenitems } from "./cartSelectors";

function CartPreview({ onClose }) {
	const navigate = useNavigate();
	const { cartState } = useContext(CartContext);

	const previewItems = selectPreviewItems(cartState, 3);
	const totalPrice = selectTotalPrice(cartState);
	const isEmpty = selectIsCartEmpty(cartState);
	const NumberOfHiddenitems = selectNumberOfHiddenitems(cartState);

	function handleViewCart() {
		onClose?.();
		navigate("/shopping-cart");
	}

	function handleItemClick(productId, category) {
		onClose?.();
		navigate(`/products/${category}/${productId}`);
	}

	return (
		<aside className="cart-preview" aria-label="Shopping cart preview">
			<h3>Shopping Cart</h3>

			{isEmpty ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<ul className="cart-preview__items">
						{previewItems.map((item) => (
							<li key={`${item.productId}-${item.addedAt}`}>
								<button
									type="button"
									onClick={() =>
										handleItemClick(item.productId, item.category)
									}
									className="cart-preview__item"
								>
									<span className="cart-preview__item-name">{item.productId}</span>
									<span className="cart-preview__item-meta">
										<span>Quantity: {item.quantity}</span>
										<span>Price per item: {item.priceSnapshot.toFixed(2)}</span>
									</span>
								</button>
							</li>
						))}
						<span className="cart-preview__more-items">and {NumberOfHiddenitems} more items</span>
					</ul>

					<br></br>
					<br></br>

					<div className="cart-preview__totalprice">
						<strong>Total:</strong> ${totalPrice.toFixed(2)}
					</div>

					<div className="cart-preview__actions">
						<button onClick={handleViewCart}>View full cart</button>
						<button disabled={isEmpty}>Checkout</button>
					</div>
				</>
			)}
		</aside>
	);
}

export default CartPreview;
