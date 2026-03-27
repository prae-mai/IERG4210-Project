import * as mariadb from "mariadb";

const pool = mariadb.createPool({
	host: "localhost",
	user: "snorlax",
	password: "bigsnore",
	database: "ierg",
	connectionLimit: 5,
});

export default pool;