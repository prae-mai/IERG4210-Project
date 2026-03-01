import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { getProducts } from "../api/productsApi";
import { slugify } from "../utils/slugify";

import ProductItem from "../components/products/public/ProductItem";

function Home() {
	useDocumentTitle("Home");

	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (loaded) return;

		async function fetchProducts() {
			try {
				const data = await getProducts();
				setProducts(data);
				setLoaded(true);
			} catch (err) {
				console.error(err);
			}
		}

		fetchProducts();
	}, [loaded]);

	const featuredProducts = Object.values(products).filter(
		(product) => product.featured,
	);

	const plushProducts = useMemo(() => {
		return products.filter(
			(product) =>
				product.categoryName?.toLowerCase() === "plush"
		);
	}, [products]);

	return (
		<section>
			<h1>Plush Products (because i like those the most)</h1>
			<p>and because i don't have a featured products flag for products in the database (yet)</p>
			<div className="product-grid">
				{plushProducts.map((product) => {
					const slug = slugify(product.name);
						return (
							<Link
								key={product.id}
								to={`/products/${product.categoryName.toLowerCase()}/${product.id}-${slug}`}
							>
								<ProductItem
									product={product}
									view="grid"
								/>
							</Link>
						);
					})}
			</div>
		</section>
	);
}

export default Home;