import { Link } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { useEffect } from "react";

import ProductItem from "../components/products/public/ProductItem";
import products from "../data/products-metadata.json";

function Home() {
	useDocumentTitle("Home");

	const featuredProducts = Object.values(products).filter(
		(product) => product.featured,
	);

	return (
		<section>
			<h1>Plush Products (because i like those the most)</h1>
			<p>and because i don't have a featured products flag for products in the database (yet)</p>
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
