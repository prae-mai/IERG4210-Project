import ProductItem from "../components/ProductItem";
import products from "../data/products-metadata.json";

function Home() {
	const featuredProducts = Object.values(products).filter((product) => product.featured);

	return (
		<section>
			<p>hi empty homepage lol</p>
			<div className="featured-products">
				{featuredProducts.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

export default Home;
