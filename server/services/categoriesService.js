import { dbQuery } from "../utils/dbQuery.js";

export async function createCategory(name) {
	const result = await dbQuery(`INSERT INTO categories (name) VALUES (?)`, [
		name,
	]);

	return Number(result.insertId);
}

export async function updateCategory(categoryId, name) {
	await dbQuery(`UPDATE categories SET name=? WHERE catid=?`, [
		name,
		categoryId,
	]);
}

export async function deleteCategory(categoryId) {
	// check if any products exist for this category
	const rows = await dbQuery(
		`SELECT COUNT(*) AS count FROM products WHERE catid = ?`,
		[categoryId],
	);

	if (rows[0].count > 0) {
		const err = new Error("Category has associated products");
		err.code = "CATEGORY_HAS_PRODUCTS";
		throw err;
	}

	await dbQuery(`DELETE FROM categories WHERE catid=?`, [categoryId]);
}

export async function getAllCategories() {
	// return await dbQuery(`SELECT * FROM categories`);
	return await dbQuery(`
		SELECT
			catid AS id,
			name
		FROM categories
	`);
}
