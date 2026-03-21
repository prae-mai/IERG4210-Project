export function createCartItem(product, quantity) {
	return {
		productId: product.id,
		name: product.name,
		category: product.categoryName,
		thumbnail: product.thumbnail,
		priceSnapshot: product.price,
		quantity,
		addedAt: new Date().toISOString(),
	};
}
