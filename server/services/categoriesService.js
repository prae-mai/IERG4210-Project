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
