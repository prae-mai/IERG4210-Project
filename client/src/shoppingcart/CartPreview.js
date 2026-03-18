import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "./useCartActions";
import { CartContext } from "./CartContext";
import { selectPreviewItems, selectTotalPrice, selectIsCartEmpty, selectNumberOfHiddenitems } from "./cartSelectors";
import { slugify } from "../utils/slugify";

import ENGLISH from "../i18n/english";

function CartPreview({ onClose }) {
	const navigate = useNavigate();
	const { cartState } = useContext(CartContext);

	const { isLocked, checkout } = useCartActions();

	const previewItems = selectPreviewItems(cartState, 3);
	const totalPrice = selectTotalPrice(cartState);
	const isEmpty = selectIsCartEmpty(cartState);
	const NumberOfHiddenitems = selectNumberOfHiddenitems(cartState);
	const hasHiddenItems = NumberOfHiddenitems > 0;

	function handleViewCart() {
		onClose?.();
		navigate("/shopping-cart");
	}

	function handleItemClick(item) {
		onClose?.();
		const slug = slugify(item.name);
		navigate(`/products/${item.category}/${item.productId}-${slug}`);
	}

	return (
		<aside className="cart-preview" aria-label="Shopping cart preview">
			<h3>{ENGLISH.CART.TITLE}</h3>

			{isEmpty ? (
				<p>{ENGLISH.CART.EMPTY}</p>
			) : (
				<>
					<ul className="cart-preview__items">
						{previewItems.map((item) => (
							<li key={item.productId}>
								<button
									type="button"
									onClick={() =>
										handleItemClick(item)
									}
									className="cart-preview__item"
								>
									<span className="cart-preview__item-name">
										{item.name}
									</span>
									<span className="cart-preview__item-meta">
										<span>
											{ENGLISH.GENERAL.QUANTITY}:{" "}
											{item.quantity}
										</span>
										<span>
											{ENGLISH.CART.PRICE_PER_ITEM}:{" "}
											{item.priceSnapshot.toFixed(2)}
										</span>
									</span>
								</button>
							</li>
						))}
						{hasHiddenItems ? (
							<span className="cart-preview__more-items">
								{ENGLISH.CART.MORE_ITEMS(NumberOfHiddenitems)}
							</span>
						) : null}
					</ul>

					<br></br>
					<br></br>

					<div className="cart-preview__totalprice">
						<strong>{ENGLISH.GENERAL.TOTAL}:</strong> $
						{totalPrice.toFixed(2)}
					</div>

					<div className="cart-preview__actions">
						<button onClick={handleViewCart}>
							{ENGLISH.CART.VIEW_FULL_CART}
						</button>
						<button onClick={checkout} disabled={isLocked}>
							{ENGLISH.CART.ACTIONS.CHECKOUT}
						</button>
					</div>
				</>
			)}
		</aside>
	);
}

export default CartPreview;