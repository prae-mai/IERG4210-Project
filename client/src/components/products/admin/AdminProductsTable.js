import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../../../api/productsApi";
import { getCategories } from "../../../api/categoriesApi";

function AdminProductsTable({ onEdit }) {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editData, setEditData] = useState({});
	const [newProduct, setNewProduct] = useState(null);

	useEffect(() => {
		loadProducts();
		loadCategories();
	}, []);

	async function loadProducts() {
		try {
			const data = await getProducts();
			setProducts(data);
		} catch (err) {
			console.error(err);
		}
	}

	async function loadCategories() {
		try {
			const data = await getCategories();
			setCategories(data);
		} catch (err) {
			console.error(err);
		}
	}

	async function handleDelete(product) {
		if (!window.confirm(`Delete ${product.name} product?`)) return;

		await deleteProduct(product.id);
		loadProducts();
	}

	function startEdit(product) {
		setEditingId(product.id);
		setEditData({ ...product });
	}

	async function saveEdit(id) {
		await updateProduct(id, editData);
		setEditingId(null);
		loadProducts();
	}

	function startCreate() {
		setNewProduct({
			categoryId: "",
			name: "",
			price: "",
			description: "",
		});
	}

	async function saveCreate() {
		await createProduct({
			...newProduct,
			categoryId: Number(newProduct.categoryId),
			price: Number(newProduct.price),
		});
		setNewProduct(null);
		loadProducts();
	}

	return (
		<section>
			<h2>Products</h2>

			<button onClick={startCreate}>Add New Product</button>

			<table border="1" cellPadding="5">
				<thead>
					<tr>
						<th>ID</th>
						<th>Category</th>
						<th>Name</th>
						<th>Price</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{products.map((p) => (
						<tr key={p.id}>
							<td>{p.id}</td>

						<td>
							{editingId === p.id ? (
								<select
									value={editData.categoryId}
									onChange={(e) =>
										setEditData({
											...editData,
											categoryId: Number(e.target.value),
										})
									}
								>
									<option value="">Select category</option>
									{categories.map((c) => (
										<option key={c.id} value={c.id}>
											{c.name}
										</option>
									))}
								</select>
							) : (
								categories.find((c) => c.id === p.categoryId)?.name || ""
							)}
						</td>

							<td>
								{editingId === p.id ? (
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
									p.name
								)}
							</td>

							<td>
								{editingId === p.id ? (
									<input
										value={editData.price}
										onChange={(e) =>
											setEditData({
												...editData,
												price: e.target.value,
											})
										}
									/>
								) : (
									p.price
								)}
							</td>

							<td>
								{editingId === p.id ? (
									<input
										value={editData.description}
										onChange={(e) =>
											setEditData({
												...editData,
												description: e.target.value,
											})
										}
									/>
								) : (
									p.description
								)}
							</td>

							<td>
								{editingId === p.id ? (
									<>
										<button onClick={() => saveEdit(p.id)}>
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
										<button onClick={() => startEdit(p)}>
											Edit
										</button>
										<button
											onClick={() => handleDelete(p)}
										>
											Delete
										</button>
									</>
								)}
							</td>
						</tr>
					))}

					{newProduct && (
						<tr>
							<td>New</td>
							<td>
							 	<select
							 		value={newProduct.categoryId}
							 		onChange={(e) =>
							 			setNewProduct({
							 				...newProduct,
							 				categoryId: Number(e.target.value),
							 			})
							 		}
							 	>
							 		<option value="">Select category</option>
							 		{categories.map((c) => (
							 			<option key={c.id} value={c.id}>
							 				{c.name}
							 			</option>
							 		))}
							 	</select>
							 </td>

							<td>
								<input
									value={newProduct.name}
									onChange={(e) =>
										setNewProduct({
											...newProduct,
											name: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<input
									value={newProduct.price}
									onChange={(e) =>
										setNewProduct({
											...newProduct,
											price: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<input
									value={newProduct.description}
									onChange={(e) =>
										setNewProduct({
											...newProduct,
											description: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<button onClick={saveCreate}>Save</button>
								<button onClick={() => setNewProduct(null)}>
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

export default AdminProductsTable;
