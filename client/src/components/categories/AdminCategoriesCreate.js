import { useState } from "react";
import { createCategory } from "../../api/categoriesApi";

function AdminCategoriesCreate() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const data = await createCategory({ name });

			setMessage(`Category created with ID ${data.catid}`);
			setName("");
		} catch (error) {
			console.error(error);
			setMessage(error.message || "Server error");
		}
	};

	return (
		<section>
			<h2>Create Category</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Name:</label>
					<input
						type="text"
						value={name}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit">Create Category</button>
			</form>

			{message && <p>{message}</p>}
		</section>
	);
}

export default AdminCategoriesCreate;
