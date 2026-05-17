import { useState } from "react";
import { useAuth } from "../utils/useAuth";

import AdminOrdersTable from "../components/orders/AdminOrdersTable";

function AdminOrders() {
	const [editingOrder, setEditingOrder] = useState(null);

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
			<h1>Admin - Orders</h1>

			<AdminOrdersTable onEdit={setEditingOrder} />
		</section>
	);
}

export default AdminOrders;
