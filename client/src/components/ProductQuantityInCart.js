import { useCart } from "../shoppingcart/useCart";

function ProductQuantityInCart({ product }) {
	const { getItemQuantity } = useCart();
	const quantity = getItemQuantity(product.id);

	if (quantity === 0) {
		return null;
	}

	return <p className="product-quantity-in-cart">In cart: {quantity}</p>;
}

export default ProductQuantityInCart;