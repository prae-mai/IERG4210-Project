function ProductName({ product }) {
	if (!product?.name) {
		return null;
	}

	return <p className="product-name">{product.name}</p>;
}

export default ProductName;