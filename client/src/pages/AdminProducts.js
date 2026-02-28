import AdminProductsCreate from "../components/products/public/admin/AdminProductsCreate";
import AdminProductsUpdate from "../components/products/public/admin/AdminProductsUpdate";
import AdminProductsDelete from "../components/products/public/admin/AdminProductsDelete";

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
