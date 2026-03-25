import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./shoppingcart/CartContext";

import Navbar from "./components/navigation/Navbar";
import HierarchicalNav from "./components/navigation/HeirarchicalNav";
import CartBadge from "./shoppingcart/CartBadge";
import CartPreviewOverlay from "./shoppingcart/CartPreviewOverlay";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
	const [isCartPreviewOpen, setCartPreviewOpen] = useState(false);

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
					<Route path="/admin" element={<Admin />} />
					<Route path="/admin/products" element={<AdminProducts />} />
					<Route path="/admin/categories" element={<AdminCategories />} />
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