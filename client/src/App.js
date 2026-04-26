import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./utils/useAuth";
import { CartProvider } from "./shoppingcart/CartContext";

import Navbar from "./components/navigation/Navbar";
import HierarchicalNav from "./components/navigation/HeirarchicalNav";
import CartBadge from "./shoppingcart/CartBadge";
import CartPreviewOverlay from "./shoppingcart/CartPreviewOverlay";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminOrders from "./pages/AdminOrders";
import ShoppingCart from "./pages/ShoppingCart";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PasswordChange from "./pages/PasswordChange";

function App() {
	const [isCartPreviewOpen, setCartPreviewOpen] = useState(false);

	function RequireAuth({ children }) {
		const { user, loading } = useAuth();

		if (loading) return <p>Loading...</p>;
		if (!user) return <Navigate to="/login" />;

		return children;
	}

	function RequireAdmin({ children }) {
		const { user, loading } = useAuth();

		if (loading) return <p>Loading...</p>;
		if (!user || !user.isAdmin) return <Navigate to="/" />;

		return children;
	}

	return (
		<CartProvider>
			<BrowserRouter>
				<Navbar />
				<CartBadge
					onClick={() => setCartPreviewOpen((open) => !open)}
				/>
				<HierarchicalNav />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:category" element={<Products />} />
					<Route
						path="/products/:category/:productId"
						element={<Products />}
					/>
					<Route path="/about" element={<About />} />
					<Route path="/shopping-cart" element={<ShoppingCart />} />
					<Route
						path="/admin"
						element={
							<RequireAdmin>
								<Admin />
							</RequireAdmin>
						}
					/>
					<Route
						path="/admin/products"
						element={
							<RequireAdmin>
								<AdminProducts />
							</RequireAdmin>
						}
					/>
					<Route
						path="/admin/categories"
						element={
							<RequireAdmin>
								<AdminCategories />
							</RequireAdmin>
						}
					/>
					<Route
						path="/admin/orders"
						element={
							<RequireAdmin>
								<AdminOrders />
							</RequireAdmin>
						}
					/>
					<Route path="/orders" element={<Orders></Orders>} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/password-change"
						element={<PasswordChange />}
					/>
				</Routes>

				<CartPreviewOverlay
					isOpen={isCartPreviewOpen}
					onClose={() => setCartPreviewOpen(false)}
				/>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;