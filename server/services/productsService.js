import { dbQuery } from "../utils/dbQuery.js";

export async function createProduct(data) {
	const result = await dbQuery(
		`INSERT INTO products (catid, name, price, description) VALUES (?, ?, ?, ?)`,
		[data.categoryId, data.name, data.price, data.description],
	);

	return Number(result.insertId);
}

export async function updateProduct(pid, data) {
	await dbQuery(
		`UPDATE products SET catid=?, name=?, price=?, description=? WHERE pid=?`,
		[data.categoryId, data.name, data.price, data.description, pid],
	);
}

export async function deleteProduct(pid) {
	await dbQuery(`DELETE FROM products WHERE pid=?`, [pid]);
}

export async function getAllProducts() {
	const rows = await dbQuery(`
		SELECT
			p.pid AS id,
			p.catid AS categoryId,
			c.name AS categoryName,
			p.name,
			p.price,
			p.description
		FROM products p
		LEFT JOIN categories c on p.catid = c.catid
	`);

	return rows.map((row) => ({
		...row,
		price: Number(row.price),
	}));
}

export async function getProductById(pid) {
	const rows = await dbQuery(`
		SELECT
			p.pid AS id,
			p.catid AS categoryId,
			c.name AS categoryName,
			p.name,
			p.price,
			p.description
		FROM products p
		LEFT JOIN categories c ON p.catid = c.catid
		WHERE p.pid = ?
		`,
		[pid],
	);

	if (rows.length === 0) {
		return null;
	}

	const product = rows[0];

	return {
		...product,
		price: Number(product.price),
	};
}