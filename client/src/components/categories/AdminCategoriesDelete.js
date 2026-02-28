import { useState } from "react";
import { deleteCategory } from "../../api/categoriesApi";

function AdminCategoriesDelete() {
	const [catid, setCatid] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await deleteCategory(Number(catid));
			setMessage("Category deleted successfully");
			setCatid("");
		} catch (error) {
			console.error(error);
			setMessage(error.message || "Server error");
		}
	};

	return (
		<section>
			<h2>Delete Category</h2>

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

				<button type="submit">Delete Category</button>
			</form>

			{message && <p>{message}</p>}
		</section>
	);
}

export default AdminCategoriesDelete;
