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
import { normalizeProductInput, validateProductInput } from "../../../utils/validateProduct";

import ENGLISH from "../../../i18n/english";

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
		try {
			const normalized = normalizeProductInput(editData);
			const errors = validateProductInput(normalized);

			if (Object.keys(errors).length > 0) {
				alert(Object.values(errors).join("\n"));
				return;
			}

			await updateProduct(id, normalized);
			setEditingId(null);
			loadProducts();
		} catch (err) {
			console.error(err);
		}
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
			const normalized = normalizeProductInput(newProduct);
			const errors = validateProductInput(normalized);

			if (Object.keys(errors).length > 0) {
				alert(Object.values(errors).join("\n"));
				return;
			}

			const result = await createProduct({
				name: normalized.name,
				description: normalized.description,
				price: normalized.price,
				categoryId: normalized.categoryId,
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
			alert(ENGLISH.PRODUCT.FAILED_CREATE);
		}
	}

	async function handleImageUpload(pid, file) {
		try {
			await uploadProductImage(pid, file);
			loadProducts();
		} catch (err) {
			console.error(err);
			alert(ENGLISH.PRODUCT.FAILED_IMAGE_UPLOAD);
		}
	}

	return (
		<section>
			<h2>Products</h2>

			<button onClick={startCreate}>{ENGLISH.PRODUCT.ADD_NEW}</button>

			<table border="1" cellPadding="5">
				<thead>
					<tr>
						<th>{ENGLISH.GENERAL.ID}</th>
						<th>{ENGLISH.GENERAL.CATEGORY}</th>
						<th>{ENGLISH.GENERAL.IMAGE}</th>
						<th>{ENGLISH.GENERAL.NAME}</th>
						<th>{ENGLISH.GENERAL.PRICE}</th>
						<th>{ENGLISH.GENERAL.DESCRIPTION}</th>
						<th>{ENGLISH.GENERAL.ACTIONS}</th>
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
												categoryId: e.target.value,
											})
										}
									>
										<option value="">
											{ENGLISH.CATEGORY.SELECT}
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
										<button onClick={() => startEdit(p)}>
											{ENGLISH.GENERAL.EDIT}
										</button>
										<button onClick={() => handleDelete(p)}>
											{ENGLISH.GENERAL.DELETE}
										</button>
									</>
								)}
							</td>
						</tr>
					))}

					{newProduct && (
						<tr>
							<td>{ENGLISH.GENERAL.NEW}</td>
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
									<option value="">{ENGLISH.CATEGORY.SELECT}</option>
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

export default AdminProductsTable;
