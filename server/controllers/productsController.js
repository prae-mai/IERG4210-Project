import * as productService from "../services/productsService.js";

export async function create(req, res) {
	try {
		const productId = await productService.createProduct(req.body);

		res.status(201).json({
			message: "Product created",
			productId,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Insert failed" });
	}
}

export async function update(req, res) {
	try {
		await productService.updateProduct(req.params.pid, req.body);
		res.json({ message: "Product updated" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Update failed" });
	}
}

export async function remove(req, res) {
	try {
		await productService.deleteProduct(req.params.pid);
		res.json({ message: "Product deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Delete failed" });
	}
}

export async function getAll(req, res) {
	try {
		const rows = await productService.getAllProducts();
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Fetch failed" });
	}
}
