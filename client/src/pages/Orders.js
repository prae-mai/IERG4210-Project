import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/ordersApi";
import { useCartActions } from "../shoppingcart/useCartActions";
import { parseCartContent } from "../utils/parseOrder";

import ENGLISH from "../i18n/english";

function Orders() {
	const location = useLocation();
	const navigate = useNavigate();

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const { clearCart } = useCartActions();

	const params = new URLSearchParams(location.search);
	const paymentSuccess = params.get("success") === "true";

	useEffect(() => {
		let isMounted = true;

		async function fetchOrders() {
			try {
				const data = await getMyOrders();
				console.log("Fetched orders:", data);
				if (isMounted) {
					setOrders(data);
				}
			} catch (err) {
				console.error(err);
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		fetchOrders();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (paymentSuccess) {
			clearCart();
			navigate("/orders", { replace: true });
		}
	}, [paymentSuccess, clearCart, navigate]);

	return (
		<section className="orders">
			<h1>Orders</h1>

			{paymentSuccess && (
				<p className="orders__success">
					Payment successful! Your order has been placed.
				</p>
			)}

			{orders.length === 0 ? (
				<p>No orders found.</p>
			) : (
				<table border="1" cellPadding="5">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Currency</th>
							<th>Product ID(s)</th>
							<th>Quantity</th>
							<th>Prices</th>
							<th>Total Price</th>
							<th>Status</th>
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
									<td>{order.currency}</td>
									<td>{pids}</td>
									<td>{quantities}</td>
									<td>{prices}</td>
									<td>{order.totalPrice}</td>
									<td>{order.status}</td>
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
			)}
		</section>
	);
}

export default Orders;
