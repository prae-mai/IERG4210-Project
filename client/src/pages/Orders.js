import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getMyOrders } from "../api/ordersApi";
import { useCartActions } from "../shoppingcart/useCartActions";

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
				// users only see most recent 5 orders
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
				<ul className="orders__list">
					{orders.map((order) => (
						<li key={order.id} className="orders__item">
							<p>
								<strong>Order #{order.id}</strong>
							</p>
							<p>Total: ${order.totalPrice.toFixed(2)}</p>
							<p>Status: {order.status}</p>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default Orders;
