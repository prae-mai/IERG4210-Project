import * as mariadb from "mariadb";

const pool = mariadb.createPool({
	host: "127.0.0.1",
	user: "snorlax",
	password: "bigsnore",
	database: "ierg",
	connectionLimit: 5,
});

export default pool;