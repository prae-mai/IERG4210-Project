import { useState } from "react";
import { useAuth } from "../utils/useAuth";

import AdminCategoriesTable from "../components/categories/AdminCategoriesTable";

function AdminCategories() {
	const [editingCategory, setEditingCategory] = useState(null);

	const { user } = useAuth();

	if (!user?.isAdmin) {
		return (
			<div>
				<p>Access denied</p>
			</div>
		);
	}

	return (
		<section>
			<h1>Admin - Categories</h1>

			<AdminCategoriesTable onEdit={setEditingCategory} />
		</section>
	);
}

export default AdminCategories;