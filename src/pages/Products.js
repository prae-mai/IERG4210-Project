import { useParams, Link } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../config/productCategories";

import ProductItem from "../components/ProductItem";
import products from "../data/products-metadata.json";
import ProductCategoryNav from "../components/ProductCategoryNav";

function Products() {
	// Gets category and productID from URL
	const { category, productID } = useParams();
	const productList = Object.values(products);

	const isDetailView = Boolean(category && productID);
	const view = isDetailView ? "detail" : "grid";

	let productsToRender = [];

	if (isDetailView) {
		const product = productList.find(
			(p) => p.id === productID && p.category === category,
		);

		if (!product) {
			return <h2>Product not found</h2>;
		}

		productsToRender = [product];
	}
	else {
		productsToRender = (!category) || (category === PRODUCT_CATEGORIES.ALL) ? productList : productList.filter((p) => p.category === category);
	}

	return (
		<>
			<section className="products-page">
				<ProductCategoryNav />
				<div className="products-content">
					{isDetailView ? (
						<section>
							<ProductItem
								product={productsToRender[0]}
								view={view}
							/>
						</section>
					) : (
						<section>
							<h1>
								{category && category !== "all"
									? category.charAt(0).toUpperCase() +
										category.slice(1)
									: "All Products"}
							</h1>
							<div className="product-grid">
								{productsToRender.map((product) => (
									<Link
										key={product.id}
										to={`/products/${product.category}/${product.id}`}
									>
										<ProductItem
											product={product}
											view={view}
										/>
									</Link>
								))}
							</div>
						</section>
					)}
				</div>
			</section>
		</>
	);
}

export default Products;
