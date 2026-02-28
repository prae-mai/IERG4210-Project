import { useState } from "react";

import AdminProductsTable from "../components/products/admin/AdminProductsTable";
import AdminProductsCreate from "../components/products/admin/AdminProductsCreate";
import AdminProductsUpdate from "../components/products/admin/AdminProductsUpdate";
import AdminProductsDelete from "../components/products/admin/AdminProductsDelete";

function AdminProducts() {
	const [editingProduct, setEditingProduct] = useState(null);

	return (
		<section>
			<h1>Admin - Products</h1>

			<AdminProductsTable onEdit={setEditingProduct} />
			<hr />
			<AdminProductsCreate />
			<hr />
			<AdminProductsUpdate product={editingProduct} />
			<hr />
			<AdminProductsDelete />
		</section>
	);
}

export default AdminProducts;
