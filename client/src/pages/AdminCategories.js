import { useState } from "react";

import AdminCategoriesTable from "../components/categories/AdminCategoriesTable";

function AdminCategories() {
	const [editingCategory, setEditingCategory] = useState(null);

	return (
		<section>
			<h1>Admin - Categories</h1>

			<AdminCategoriesTable onEdit={setEditingCategory} />
		</section>
	);
}

export default AdminCategories;