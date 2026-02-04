import { PRODUCT_VIEWS } from "../config/productViews";
import { getImageUrl } from "../utils/getImageUrl";

function ProductItem({ product, view }) {
	const fields = PRODUCT_VIEWS[view];

	if (!fields) {
		return <h2>Invalid product view</h2>;;
	}

	return (
		<article className="product-item">
			{fields.includes("thumbnail") && product.thumbnail && (
				<figure>
					<img
						src={getImageUrl(product.thumbnail)}
						alt={product.name}
					/>
				</figure>
			)}

			{fields.includes("name") && product.name && <p>{product.name}</p>}

			{fields.includes("description") && product.description && (
				<p>{product.description}</p>
			)}

			{fields.includes("price") && typeof product.price === "number" && (
				<p className="product-price">${product.price}</p>
			)}

			{fields.includes("tags") && Array.isArray(product.tags) && (
				<ul className="product-tags">
					{product.tags.map((tag) => (
						<li key={tag}>{tag}</li>
					))}
				</ul>
			)}
		</article>
	);
}

export default ProductItem;
