import AdminCategoriesCreate from "../components/categories/AdminCategoriesCreate";
import AdminCategoriesUpdate from "../components/categories/AdminCategoriesUpdate";
import AdminCategoriesDelete from "../components/categories/AdminCategoriesDelete";

function AdminCategories() {
	return (
		<section>
			<h1>Admin - Categories</h1>

			<AdminCategoriesCreate />
			<hr />
			<AdminCategoriesUpdate />
			<hr />
			<AdminCategoriesDelete />
		</section>
	);
}

export default AdminCategories;