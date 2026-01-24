import { getImageUrl } from "../utils/getImageUrl";

function ProductItem({ product }) {
	return (
		<article className="product-item">
			<figure>
				<img src={getImageUrl(product.thumbnail)} alt={product.name} />
				<figcaption>{product.name}</figcaption>
			</figure>
			{product.description && <p>{product.description}</p>}
		</article>
	);
}

export default ProductItem;