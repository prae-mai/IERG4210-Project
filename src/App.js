import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./shoppingcart/CartContext";

import Navbar from "./components/Navbar";
import HierarchicalNav from "./components/HeirarchicalNav";
import CartBadge from "./shoppingcart/CartBadge";
import CartPreviewOverlay from "./shoppingcart/CartPreviewOverlay";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";


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
