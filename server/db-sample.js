import * as mariadb from "mariadb";

const pool = mariadb.createPool({
	host: "localhost",
	user: "root",
	password: "your password",
	database: "ierg",
	connectionLimit: 5,
});

export default pool;