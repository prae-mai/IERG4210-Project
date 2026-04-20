import { PRODUCT_FIELDS, PRODUCT_VIEWS } from "../../../config/productViews";

import ProductThumbnail from "./ProductThumbnail";
import ProductName from "./ProductName";
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
import ProductTags from "./ProductTags";
import ProductQuantityInCart from "./ProductQuantityInCart";
import ProductQuantitySelector from "./ProductQuantitySelector";

import ENGLISH from "../../../i18n/english";

const FIELD_COMPONENTS = {
	[PRODUCT_FIELDS.THUMBNAIL]: ProductThumbnail,
	[PRODUCT_FIELDS.NAME]: ProductName,
	[PRODUCT_FIELDS.DESCRIPTION]: ProductDescription,
	[PRODUCT_FIELDS.PRICE]: ProductPrice,
	[PRODUCT_FIELDS.TAGS]: ProductTags,
	[PRODUCT_FIELDS.QUANTITY_IN_CART]: ProductQuantityInCart,
	[PRODUCT_FIELDS.QUANTITY_SELECTOR]: ProductQuantitySelector,
};

// Defaults to grid view if no view given
// Currently only affects Featured products in the Home page
function ProductItem({ product, view = "grid" }) {
	const fields = PRODUCT_VIEWS[view];

	if (!fields) {
		return <h2>{ENGLISH.PRODUCT.INVALID_VIEW}</h2>;
	}

	const thumbnailField = fields.find(
		(field) =>
			field === PRODUCT_FIELDS.THUMBNAIL.THUMB ||
			field === PRODUCT_FIELDS.THUMBNAIL.BIG
	);

	return (
		<article className={`product-item--${view}`}>
			<div className="product-item__media">
				{thumbnailField && (
					<ProductThumbnail product={product} field={thumbnailField} />
				)}
			</div>
			<div className="product-item__content">
				{fields
					.filter((field) => field !== PRODUCT_FIELDS.THUMBNAIL)
					.map((field) => {
						const FieldComponent = FIELD_COMPONENTS[field];
						if (!FieldComponent) return null;
						return <FieldComponent key={field} product={product} />;
					})}
			</div>
		</article>
	);
}

export default ProductItem;