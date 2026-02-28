import AdminProductsCreate from "../components/AdminProductsCreate";
import AdminProductsUpdate from "../components/AdminProductsUpdate";
import AdminProductsDelete from "../components/AdminProductsDelete";

function AdminProducts() {
	return (
		<section>
			<h1>Admin - Products</h1>

			<AdminProductsCreate />
			<hr />
			<AdminProductsUpdate />
			<hr />
			<AdminProductsDelete />
		</section>
	);
}

export default AdminProducts;
