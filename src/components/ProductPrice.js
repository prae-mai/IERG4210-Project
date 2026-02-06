function ProductPrice({ product }) {
	if (!product?.price) {
		return null;
	}

	return <p className="product-price">{product.price}</p>;
}

export default ProductPrice;