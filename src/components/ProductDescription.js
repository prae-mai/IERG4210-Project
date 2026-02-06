function ProductDescription({ product }) {
	if (!product?.description) {
		return null;
	}

	return <p className="product-description">{product.description}</p>;
}

export default ProductDescription;
