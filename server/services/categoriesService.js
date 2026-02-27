import { dbQuery } from "../utils/dbQuery.js";

export async function createCategory(name) {
	const result = await dbQuery(`INSERT INTO categories (name) VALUES (?)`, [
		name,
	]);

	return Number(result.insertId);
}

export async function updateCategory(catid, name) {
	await dbQuery(`UPDATE categories SET name=? WHERE catid=?`, [name, catid]);
}

export async function deleteCategory(catid) {
	await dbQuery(`DELETE FROM categories WHERE catid=?`, [catid]);
}

export async function getAllCategories() {
	return await dbQuery(`SELECT * FROM categories`);
}
