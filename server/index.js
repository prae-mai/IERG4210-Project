import { requestLogger } from "./requestLogger.js";

import express from "express";
import cors from "cors";
import path from "path";
import pool from "./db.js";
import cookieParser from "cookie-parser";
import productsRoutes from "./routes/products.js";
import categoriesRoutes from "./routes/categories.js";
import authRoutes from "./routes/auth.js"
import ordersRoutes from "./routes/orders.js"

const app = express();

app.use(requestLogger);
app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);
app.use(express.json()); // allows JSON body
app.use(cookieParser());
app.use("/images/products", express.static(path.join(process.cwd(), "uploads/products")));

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get("/api/db-test", async (req, res) => {
	try {
		const conn = await pool.getConnection();
		const rows = await conn.query("SELECT 1 AS test");
		conn.release();

		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Database connection failed" });
	}
});