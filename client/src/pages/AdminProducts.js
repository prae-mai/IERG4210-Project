import { useState } from "react";
import { useAuth } from "../utils/useAuth";

import AdminProductsTable from "../components/products/admin/AdminProductsTable";

function AdminProducts() {
	const [editingProduct, setEditingProduct] = useState(null);

	const { user } = useAuth();

	if (!user?.isAdmin) {
		return (
			<section>
				<p>Access denied</p>
			</section>
		);
	}

	return (
		<section>
			<h1>Admin - Products</h1>

			<AdminProductsTable onEdit={setEditingProduct} />
		</section>
	);
}

export default AdminProducts;
