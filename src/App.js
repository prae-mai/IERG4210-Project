import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HierarchicalNav from "./components/HeirarchicalNav";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
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
		</BrowserRouter>
	);
}

export default App;
