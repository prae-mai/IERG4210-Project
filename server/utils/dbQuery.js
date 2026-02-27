import pool from "../db.js";

export async function dbQuery(query, params = []) {
	let conn;

	try {
		conn = await pool.getConnection();
		const result = await conn.query(query, params);
		return result;
	} finally {
		if (conn) conn.release();
	}
}
