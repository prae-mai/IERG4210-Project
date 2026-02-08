import { useContext } from "react";
import { CartContext } from "../shoppingcart/CartContext";
import { selectAllCartItems, selectTotalPrice } from "../shoppingcart/cartSelectors";
import { useCartActions } from "../shoppingcart/useCartActions.js";
import CartItemRow from "../shoppingcart/CartItemRow.js";

import ENGLISH from "../i18n/english.js"

function ShoppingCart() {
	const { cartState, dispatch } = useContext(CartContext);
	const items = selectAllCartItems(cartState);
	const totalPrice = selectTotalPrice(cartState);

	const { isLocked, setQuantity, removeItem, clearCart, checkout, unlockCart } = useCartActions();

	return (
		<section className="shopping-cart">
			<h1 className="shopping-cart__title">{ENGLISH.CART.TITLE}</h1>

			{items.length === 0 ? (
				<p className="shopping-cart__empty">{ENGLISH.CART.EMPTY}</p>
			) : (
				<>
					<ul className="shopping-cart__items">
						{items.map((item) => (
							<CartItemRow
								key={item.productId}
								item={item}
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
							<button onClick={checkout} disabled={isLocked}>
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
