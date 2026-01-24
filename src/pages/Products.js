import { useParams, Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import products from "../data/products-metadata.json";

function Products() {

	const { category, productId } = useParams();
	const productList = Object.values(products);

	return (
		<div>
			<p>detailed products information found here</p>
		</div>
	);
}

export default Products;
