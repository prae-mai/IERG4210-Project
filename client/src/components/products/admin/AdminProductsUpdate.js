import { useState } from "react";
import { updateProduct } from "../../../api/productsApi";

function AdminProductsUpdate() {
	const [pid, setPid] = useState("");
	const [formData, setFormData] = useState({
		catid: "",
		name: "",
		price: "",
		description: "",
	});

	const [message, setMessage] = useState("");

	const handlePidChange = (e) => {
		setPid(e.target.value);
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await updateProduct(pid, {
				...formData,
				catid: Number(formData.catid),
				price: Number(formData.price),
			});

			setMessage("Product updated successfully");
		} catch (error) {
			console.error(error);
			setMessage(error.message || "Server error");
		}
	};

	return (
		<div>
			<h2>Update Product</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Product ID:</label>
					<input
						type="number"
						name="pid"
						value={formData.pid}
						onChange={handlePidChange}
						required
					/>
				</div>

				<div>
					<label>Category ID:</label>
					<input
						type="number"
						name="catid"
						value={formData.catid}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Price:</label>
					<input
						type="number"
						step="0.01"
						name="price"
						value={formData.price}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Description:</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>

				<button type="submit">Update Product</button>
			</form>

			{message && <p>{message}</p>}
		</div>
	);
}

export default AdminProductsUpdate;
