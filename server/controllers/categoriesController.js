import { validateCategoryName, validateId } from "../utils/validators.js";
import { assertAdmin } from "./authController.js";

import * as categoryService from "../services/categoriesService.js";

export async function create(req, res) {
	try {
		assertAdmin(req);
		const categoryName = validateCategoryName(req.body.name);
		const catid = await categoryService.createCategory(categoryName);
		
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
		assertAdmin(req);
		const catid = validateId(req.params.catid, "category id");
		const name = validateCategoryName(req.body.name);
		
		await categoryService.updateCategory(catid, name);

		res.json({ message: "Category updated" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Update failed" });
	}
}

export async function remove(req, res) {
	try {
		assertAdmin(req);
		const catid = validateId(req.params.catid, "category id");
		await categoryService.deleteCategory(catid);

		res.json({ message: "Category deleted" });
	} catch (err) {
		console.error(err);
		if (err.code === "CATEGORY_HAS_PRODUCTS") {
			return res.status(400).json({
				error: err.code,
				message: "Cannot delete category with existing products",
			});
		}

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

