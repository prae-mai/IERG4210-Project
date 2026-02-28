import { useState } from "react";
import { updateCategory } from "../../api/categoriesApi";

function AdminCategoriesUpdate() {
	const [catid, setCatid] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await updateCategory(Number(catid), { name });

			setMessage("Category updated successfully");
		} catch (error) {
			console.error(error);
			setMessage(error.message || "Server error");
		}
	};

	return (
		<section>
			<h2>Update Category</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Category ID:</label>
					<input
						type="number"
						value={catid}
						onChange={(e) => setCatid(e.target.value)}
						required
					/>
				</div>

				<div>
					<label>Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<button type="submit">Update Category</button>
			</form>

			{message && <p>{message}</p>}
		</section>
	);
}

export default AdminCategoriesUpdate;
