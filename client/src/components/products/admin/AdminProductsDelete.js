import { useState } from "react";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../../../api/productsApi";

function AdminProductsDelete() {
	const [pid, setPid] = useState("");
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setPid(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await deleteProduct(Number(pid));
			setMessage("Product deleted successfully");
			setPid("");
		} catch (error) {
			console.error(error);
			setMessage(error.message || "Server error");
		}
	};

	return (
		<div>
			<h2>Delete Product</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Product ID:</label>
					<input
						type="number"
						name="pid"
						value={pid}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit">Delete</button>
			</form>

			{message && <p>{message}</p>}
		</div>
	);
}

export default AdminProductsDelete;
