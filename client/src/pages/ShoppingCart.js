import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";

import { CartContext } from "../shoppingcart/CartContext";
import { selectAllCartItems, selectTotalPrice } from "../shoppingcart/cartSelectors";
import { useCartActions } from "../shoppingcart/useCartActions.js";

import CartItemRow from "../shoppingcart/CartItemRow.js";

import ENGLISH from "../i18n/english.js"

function ShoppingCart() {
	useDocumentTitle("Shopping Cart");

	const location = useLocation();

	const { cartState, dispatch } = useContext(CartContext);
	const items = selectAllCartItems(cartState);
	const totalPrice = selectTotalPrice(cartState);

	const { isLocked, setQuantity, removeItem, clearCart, checkout, unlockCart } = useCartActions();

	useEffect(() => {
		const params = new URLSearchParams(location.search);

		if (params.get("cancelled") === "true") {
			unlockCart();
			alert(ENGLISH.CART.STATUS.CANCEL_CHECKOUT);
		}
	}, [location.search, unlockCart]);

	return (
		<section className="shopping-cart">
			<h1 className="shopping-cart__title">{ENGLISH.CART.TITLE}</h1>

			{items.length === 0 ? (
				<p className="shopping-cart__empty">{ENGLISH.CART.EMPTY}</p>
			) : (
				<>
					<ul className="shopping-cart__items">
						{items.map((cartItem) => (
							<CartItemRow
								key={cartItem.productId}
								cartItem={cartItem}
								isLocked={isLocked}
								setQuantity={setQuantity}
								removeItem={removeItem}
							/>
						))}
					</ul>
					<p className="shopping-cart__summary">
						<strong>{ENGLISH.GENERAL.TOTAL}:</strong> $
						{totalPrice.toFixed(2)}
					</p>

					<div className="shopping-cart__actions">
						{isLocked ? (
							<button onClick={unlockCart}>
								{ENGLISH.CART.ACTIONS.CANCEL_CHECKOUT}
							</button>
						) : (
							<button
								onClick={() =>
									checkout(
										items.map(
											({ productId, quantity }) => ({
												productId,
												quantity,
											}),
										),
									)
								}
								disabled={isLocked}
							>
								{ENGLISH.CART.ACTIONS.CHECKOUT}
							</button>
						)}
						<button onClick={clearCart} disabled={isLocked}>
							{ENGLISH.CART.ACTIONS.CLEAR}
						</button>
					</div>
				</>
			)}
		</section>
	);
}

export default ShoppingCart;
