import { useEffect, useState } from "react";
import { 
	getProducts,
	createProduct,
	deleteProduct,
	updateProduct,
	uploadProductImage,
 } from "../../../api/productsApi";
import { BASE_API_URL } from "../../../config/apiConfig";
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
			imageFile: null,
		});
	}

	async function saveCreate() {
		try {
			const result = await createProduct({
				...newProduct,
				categoryId: Number(newProduct.categoryId),
				price: Number(newProduct.price),
			});

			// if image selected, upload after product is created
			if (newProduct.imageFile) {
				await uploadProductImage(
					result.productId,
					newProduct.imageFile,
				);
			}
			setNewProduct(null);
			loadProducts();
		} catch (err) {
			console.error(err);
			alert("Create failed");
		}
	}

	async function handleImageUpload(pid, file) {
		try {
			await uploadProductImage(pid, file);
			loadProducts();
		} catch (err) {
			console.error(err);
			alert("Image upload failed");
		}
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
						<th>Image</th>
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
												categoryId: Number(
													e.target.value,
												),
											})
										}
									>
										<option value="">
											Select category
										</option>
										{categories.map((c) => (
											<option key={c.id} value={c.id}>
												{c.name}
											</option>
										))}
									</select>
								) : (
									categories.find(
										(c) => c.id === p.categoryId,
									)?.name || ""
								)}
							</td>

							<td>
								<img
									src={`${BASE_API_URL}/images/products/${p.id}-thumb.png`}
									alt={`${p.id}-thumb`}
									width="40"
									height="40"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src =
											"/images/placeholder.png";
									}}
								/>

								{editingId === p.id && (
									<input
										type="file"
										accept="image/*"
										onChange={(e) =>
											handleImageUpload(
												p.id,
												e.target.files[0],
											)
										}
									/>
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
										<button onClick={() => handleDelete(p)}>
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
									type="file"
									accept="image/*"
									onChange={(e) =>
										setNewProduct({
											...newProduct,
											imageFile: e.target.files[0],
										})
									}
								/>
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
