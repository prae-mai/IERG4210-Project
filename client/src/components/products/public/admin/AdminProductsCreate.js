import { useState } from "react";
import { createProduct } from "../../../../api/productsApi";

function AdminProductsCreate() {
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
			const data = await createProduct({...formData, catid: Number(formData.catid), price: Number(formData.price)});

			setMessage(`Product created with ID ${data.productId}`);
			
			setFormData({
				catid: "",
				name: "",
				price: "",
				description: "",
			});

		} catch (error) {
			console.error(error);
			setMessage("Server error");
		}
	};

	return (
		<section>
			<h1>Create Product</h1>

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

export default AdminProductsCreate;
