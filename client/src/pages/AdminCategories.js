import { useState } from "react";

import AdminCategoriesTable from "../components/categories/AdminCategoriesTable";
import AdminCategoriesCreate from "../components/categories/AdminCategoriesCreate";
import AdminCategoriesUpdate from "../components/categories/AdminCategoriesUpdate";
import AdminCategoriesDelete from "../components/categories/AdminCategoriesDelete";

function AdminCategories() {
	const [editingCategory, setEditingCategory] = useState(null);

	return (
		<section>
			<h1>Admin - Categories</h1>

			<AdminCategoriesTable onEdit={setEditingCategory} />
			<hr />
			<AdminCategoriesCreate />
			<hr />
			<AdminCategoriesUpdate category={editingCategory} />
			<hr />
			<AdminCategoriesDelete />
		</section>
	);
}

export default AdminCategories;