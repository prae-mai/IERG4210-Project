import { getImageUrl } from "../utils/getImageUrl";

function ProductThumbnail({ product }) {
	return (
		<figure>
			<img
				src={
					product?.thumbnail
						? getImageUrl(product.thumbnail)
						: getImageUrl("placeholder-thumbnail.png")
				}
				alt={product.name}
			/>
		</figure>
	);
}

export default ProductThumbnail;