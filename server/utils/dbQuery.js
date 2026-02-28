import pool from "../db.js";

export async function dbQuery(query, params = []) {
	let conn;

	try {
		conn = await pool.getConnection();
		const rows = await conn.query(query, params);
		return rows;
	} finally {
		if (conn) conn.release();
	}
}
