import { dbQuery } from "../utils/dbQuery.js";

export async function createProduct(data) {
	const result = await dbQuery(
		`INSERT INTO products (catid, name, price, description) VALUES (?, ?, ?, ?)`,
		[data.catid, data.name, data.price, data.description],
	);

	return Number(result.insertId);
}

export async function updateProduct(pid, data) {
	await dbQuery(
		`UPDATE products SET catid=?, name=?, price=?, description=? WHERE pid=?`,
		[data.catid, data.name, data.price, data.description, pid],
	);
}

export async function deleteProduct(pid) {
	await dbQuery(`DELETE FROM products WHERE pid=?`, [pid]);
}