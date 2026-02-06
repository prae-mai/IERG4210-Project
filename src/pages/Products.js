import { useParams, Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import products from "../data/products-metadata.json";

function Products() {
	const { category, productId } = useParams();
	const productList = Object.values(products);

	// Detail view
	if (category && productId) {
		const product = productList.find((p) => (p.id === productId) && (p.category === category));

		if (!product) {
			return <h2>Product not found</h2>;
		}
		else {
			return (
				<section>
					<ProductItem product={product} view="detail" />
				</section>
			);
		}
	}

	// Grid view
	const filteredProducts = (!category) || (category === "all") ? productList : productList.filter((p) => p.category === category);

	return (
		<section>
			<h2>
				{category && category !== "all"
					? category.charAt(0).toUpperCase() + category.slice(1)
					: "All Products"}
			</h2>

			<div className="product-grid">
				{filteredProducts.map((product) => (
					<Link
						key={product.id}
						to={`/products/${product.category}/${product.id}`}
					>
						<ProductItem product={product} view="grid"/>
					</Link>
				))}
			</div>
		</section>
	);

}

export default Products;
