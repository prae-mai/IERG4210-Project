import { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory, updateCategory } from "../../api/categoriesApi";

function AdminCategoriesTable({ onEdit }) {
	const [categories, setCategories] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [newCategory, setNewCategory] = useState(null);
	const [editName, setEditName] = useState("");

	useEffect(() => {
		loadCategories();
	}, []);

	async function loadCategories() {
		try {
			const data = await getCategories();
			setCategories(data);
		} catch (err) {
			console.error(err);
		}
	}

	async function handleDelete(category) {
		if (!window.confirm(`Delete ${category.name} category?`)) return;

		await deleteCategory(category.id);
		loadCategories();
	}

	function startEdit(category) {
		setEditingId(category.id);
		setEditName(category.name);
	}

	async function saveEdit(id) {
		await updateCategory(id, { name: editName });
		setEditingId(null);
		loadCategories();
	}

	function startCreate() {
		setNewCategory({ name: "" });
	}

	async function saveCreate() {
		await createCategory({ name: newCategory.name });
		setNewCategory(null);
		loadCategories();
	}

	return (
		<section>
			<h2>Categories</h2>

			<button onClick={startCreate}>Add New Category</button>

			<table border="1" cellPadding="5">
				<thead>
					<tr>
						<th>Name</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{categories.map((c) => (
						<tr key={c.id}>
							<td>
								{editingId === c.id ? (
									<input
										value={editName}
										onChange={(e) =>
											setEditName(e.target.value)
										}
									/>
								) : (
									c.name
								)}
							</td>

							<td>
								{editingId === c.id ? (
									<>
										<button
											onClick={() => saveEdit(c.id)}
										>
											Save
										</button>
										<button
											onClick={() => setEditingId(null)}
										>
											Cancel
										</button>
									</>
								) : (
									<>
										<button onClick={() => startEdit(c)}>
											Edit
										</button>
										<button
											onClick={() =>
												handleDelete(c)
											}
										>
											Delete
										</button>
									</>
								)}
							</td>
						</tr>
					))}

					{newCategory && (
						<tr>
							<td>
								<input
									value={newCategory.name}
									onChange={(e) =>
										setNewCategory({ name: e.target.value })
									}
								/>
							</td>
							<td>
								<button onClick={saveCreate}>Save</button>
								<button onClick={() => setNewCategory(null)}>
									Cancel
								</button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	);
}

export default AdminCategoriesTable;
