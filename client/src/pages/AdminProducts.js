import { useState } from "react";

import AdminProductsTable from "../components/products/admin/AdminProductsTable";

function AdminProducts() {
	const [editingProduct, setEditingProduct] = useState(null);

	return (
		<section>
			<h1>Admin - Products</h1>

			<AdminProductsTable onEdit={setEditingProduct} />
		</section>
	);
}

export default AdminProducts;
