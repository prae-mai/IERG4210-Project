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

	function startEdit(product) {
		setEditingId(product.pid);
		setEditData({ ...product });
	}

	async function saveEdit(pid) {
		await updateProduct(pid, editData);
		setEditingId(null);
		loadProducts();
	}

	function startCreate() {
		setNewProduct({
			catid: "",
			name: "",
			price: "",
			description: "",
		});
	}

	async function saveCreate() {
		await createProduct({
			...newProduct,
			catid: Number(newProduct.catid),
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
						<tr key={p.pid}>
							<td>{p.pid}</td>

						<td>
							{editingId === p.pid ? (
								<select
									value={editData.catid}
									onChange={(e) =>
										setEditData({
											...editData,
											catid: e.target.value,
										})
									}
								>
									<option value="">Select category</option>
									{categories.map((c) => (
										<option key={c.catid} value={c.catid}>
											{c.name}
										</option>
									))}
								</select>
							) : (
								categories.find((c) => c.catid === p.catid)?.name || ""
							)}
						</td>

							<td>
								{editingId === p.pid ? (
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
								{editingId === p.pid ? (
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
								{editingId === p.pid ? (
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
								{editingId === p.pid ? (
									<>
										<button onClick={() => saveEdit(p.pid)}>
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
							 		value={newProduct.catid}
							 		onChange={(e) =>
							 			setNewProduct({
							 				...newProduct,
							 				catid: e.target.value,
							 			})
							 		}
							 	>
							 		<option value="">Select category</option>
							 		{categories.map((c) => (
							 			<option key={c.catid} value={c.catid}>
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
