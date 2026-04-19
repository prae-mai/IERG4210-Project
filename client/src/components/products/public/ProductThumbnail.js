import { BASE_API_URL } from "../../../../../shared/config/apiConfig";

function ProductThumbnail({ product, field }) {
	return (
		<figure>
			<img
				src={`${BASE_API_URL}/images/products/${product.id}-${field}.png`}
				alt={product.name}
				onError={(e) => {
					e.target.onerror = null;
					e.target.src = "/images/placeholder.png";
				}}
			/>
		</figure>
	);
}

export default ProductThumbnail;