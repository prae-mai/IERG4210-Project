import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import * as productService from "../services/productsService.js";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB limit
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new Error("Only image files are allowed"));
		}
	},
});

export const uploadMiddleware = upload.single("image");

export async function create(req, res) {
	try {
		const productId = await productService.createProduct(req.body);

		res.status(201).json({
			message: "Product created",
			productId,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Insert failed" });
	}
}

export async function update(req, res) {
	try {
		await productService.updateProduct(req.params.pid, req.body);
		res.json({ message: "Product updated" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Update failed" });
	}
}

export async function remove(req, res) {
	try {
		await productService.deleteProduct(req.params.pid);
		res.json({ message: "Product deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Delete failed" });
	}
}

export async function getAll(req, res) {
	try {
		const rows = await productService.getAllProducts();
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Fetch failed" });
	}
}

export async function getById(req, res) {
	try {
		const { pid } = req.params;

		const product = await productService.getProductById(pid);

		if (!product) {
			return res.status(404).json({
				error: "Product not found",
			});
		}
		res.json(product);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Fetch failed" });
	}
}

export async function uploadImage(req, res) {
	try {
		const { pid } = req.params;

		if (!req.file) {
			return res.status(400).json({ error: "No image uploaded" });
		}

		// ensure uploads directory exists
		const uploadDir = path.join(process.cwd(), "uploads/products");

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const bigPath = path.join(uploadDir, `${pid}-big.png`);
		const thumbPath = path.join(uploadDir, `${pid}-thumb.png`);

		// both big and thumb use transparent padding if needed
		// big 300x300
		await sharp(req.file.buffer)
			.resize(300, 300, {
				fit: sharp.fit.contain,
				background: { r: 0, g: 0, b: 0, alpha: 0 },
				withoutEnlargement: true,
			})
			.png({ quality: 90 })
			.toFile(bigPath);

		// thumb 80x80
		await sharp(req.file.buffer)
			.resize(80, 80, {
				fit: sharp.fit.contain,
				background: { r: 0, g: 0, b: 0, alpha: 0 },
				withoutEnlargement: true,
			})
			.png({ quality: 90 })
			.toFile(thumbPath);

		res.json({ message: "Image uploaded successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Image processing failed" });
	}
}