import { useEffect, useState } from "react";
import { getOrders } from "../../api/ordersApi";
import { parseCartContent } from "../../utils/parseOrder";

import ENGLISH from "../../i18n/english";

function AdminOrdersTable({ onEdit }) {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		loadOrders();
	}, []);

	async function loadOrders() {
		try {
			const data = await getOrders();
			setOrders(data);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<section>
			<h2>Orders</h2>
			<table border="1" cellPadding="5">
				<thead>
					<tr>
						<th>Order ID</th>
						<th>User ID</th>
						<th>Currency</th>
						<th>Merchant Email</th>
						<th>Random Salt</th>
						<th>Product ID(s)</th>
						<th>Quantity</th>
						<th>Prices</th>
						<th>Total Price</th>
						<th>Status</th>
						<th>Stripe session ID</th>
						<th>Stripe payment intent ID</th>
						<th>Processed at</th>
					</tr>
				</thead>

				<tbody>
					{orders.map((order) => {
						const { pids, quantities, prices } =
							parseCartContent(order.cartcontent);
						return (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.userId}</td>
								<td>{order.currency}</td>
								<td>{order.merchantEmailAddress}</td>
								<td>{order.randomSalt}</td>
								<td>{pids}</td>
								<td>{quantities}</td>
								<td>{prices}</td>
								<td>{order.totalPrice}</td>
								<td>{order.status}</td>
								<td>{order.stripeSessionId}</td>
								<td>{order.stripePaymentIntentId}</td>
								<td>
									{order.processedAt
										? new Date(
												order.processedAt,
											).toLocaleString()
										: "-"}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
}

export default AdminOrdersTable;