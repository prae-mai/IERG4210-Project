import { useState } from "react";

function AdminProducts() {
	const [formData, setFormData] = useState({
		catid: "",
		name: "",
		price: "",
		description: "",
	});

	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:5000/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					catid: Number(formData.catid),
					price: Number(formData.price),
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage(`Product created with ID ${data.productId}`);
				setFormData({
					catid: "",
					name: "",
					price: "",
					description: "",
				});
			} else {
				setMessage(data.error || "Error creating product");
			}
		} catch (error) {
			console.error(error);
			setMessage("Server error");
		}
	};

	return (
		<section>
			<h1>Admin - Add Product</h1>

			<form onSubmit={handleSubmit}>
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

				<button type="submit">Create Product</button>
			</form>

			{message && <p>{message}</p>}
		</section>
	);
}

export default AdminProducts;
