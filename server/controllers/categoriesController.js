import * as categoryService from "../services/categoriesService.js";

export async function create(req, res) {
	try {
		const catid = await categoryService.createCategory(name);

		res.status(201).json({
			message: "Category created",
			catid,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Insert failed" });
	}
}

export async function update(req, res) {
	try {
		await categoryService.updateCategory(catid, name);
		res.json({ message: "Category updated" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Update failed" });
	}
}

export async function remove(req, res) {
	try {
		await categoryService.deleteCategory(catid);
		res.json({ message: "Category deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Delete failed" });
	}
}

export async function getAll(req, res) {
	try {
		const rows = await categoryService.getAllCategories();
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Fetch failed" });
	}
}

