import { useState } from "react";
import { useAuth } from "../utils/useAuth";

import AdminOrdersTable from "../components/orders/AdminOrdersTable";

function AdminOrders() {
	const [editingOrder, setEditingOrder] = useState(null);

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
			<h1>Admin - Orders</h1>

			<AdminOrdersTable onEdit={setEditingOrder} />
		</section>
	);
}

export default AdminOrders;
