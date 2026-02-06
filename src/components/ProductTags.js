function ProductTags({ product }) {
	if (!product?.tags) {
		return null;
	}

	return (
		<ul className="product-tags">
			{product.tags.map((tag) => (
				<li key={tag}>{tag}</li>
			))}
		</ul>
	);
}

export default ProductTags;