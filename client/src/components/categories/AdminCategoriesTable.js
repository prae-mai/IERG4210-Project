import { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory, updateCategory } from "../../api/categoriesApi";
import { normalizeCategoryInput, validateCategoryInput } from "../../utils/validateCategory";

import ENGLISH from "../../i18n/english";

function AdminCategoriesTable({ onEdit }) {
	const [categories, setCategories] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editData, setEditData] = useState("");
	const [newCategory, setNewCategory] = useState(null);

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

		try {
			await deleteCategory(category.id);
			loadCategories();
		} catch (err) {
			if (err.code === "CATEGORY_HAS_PRODUCTS") {
				alert("Cannot delete category: products still exist.");
			} else {
				alert("Failed to delete category");
			}
		}
	}

	function startEdit(category) {
		setEditingId(category.id);
		setEditData({ ...category });
	}

	async function saveEdit(id) {
		try {
			const normalized = normalizeCategoryInput(editData);
			const errors = validateCategoryInput(normalized);

			if (Object.keys(errors).length > 0) {
				alert(Object.values(errors).join("\n"));
				return;
			}

			await updateCategory(id, normalized);
			setEditingId(null);
			loadCategories();
		} catch (err) {
			console.error(err);
		}
	}

	function startCreate() {
		setNewCategory({ name: "" });
	}

	async function saveCreate() {
		try {
			const normalized = normalizeCategoryInput(newCategory);
			const errors = validateCategoryInput(normalized);

			if (Object.keys(errors).length > 0) {
				alert(Object.values(errors).join("\n"));
				return;
			}

			await createCategory(normalized);
			setNewCategory(null);
			loadCategories();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<section>
			<h2>Categories</h2>

			<button onClick={startCreate}>{ENGLISH.CATEGORY.ADD_NEW}</button>

			<table border="1" cellPadding="5">
				<thead>
					<tr>
						<th>{ENGLISH.GENERAL.NAME}</th>
						<th>{ENGLISH.GENERAL.ACTIONS}</th>
					</tr>
				</thead>

				<tbody>
					{categories.map((c) => (
						<tr key={c.id}>
							<td>
								{editingId === c.id ? (
									<input
										value={editData.name}
										onChange={(e) =>
											setEditData({
												...editData,
												name: e.target.value,
											})
										}
									/>
								) : (
									c.name
								)}
							</td>

							<td>
								{editingId === c.id ? (
									<>
										<button onClick={() => saveEdit(c.id)}>
											{ENGLISH.GENERAL.SAVE}
										</button>
										<button
											onClick={() => setEditingId(null)}
										>
											{ENGLISH.GENERAL.CANCEL}
										</button>
									</>
								) : (
									<>
										<button onClick={() => startEdit(c)}>
											{ENGLISH.GENERAL.EDIT}
										</button>
										<button onClick={() => handleDelete(c)}>
											{ENGLISH.GENERAL.DELETE}
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
								<button onClick={saveCreate}>
									{ENGLISH.GENERAL.SAVE}
								</button>
								<button onClick={() => setNewCategory(null)}>
									{ENGLISH.GENERAL.CANCEL}
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
