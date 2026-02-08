import { Link } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";

import ProductItem from "../components/ProductItem";
import products from "../data/products-metadata.json";

function Home() {
	useDocumentTitle("Home");

	const featuredProducts = Object.values(products).filter(
		(product) => product.featured,
	);

	return (
		<section>
			<p>hi empty homepage lol</p>
			<h1>Featured Products</h1>
			<div className="product-grid">
					{featuredProducts.map((product) => (
						<Link
							key={product.id}
							to={`/products/${product.category}/${product.id}`}
						>
							<ProductItem product={product} />
						</Link>
					))}
			</div>
		</section>
	);
}

export default Home;
