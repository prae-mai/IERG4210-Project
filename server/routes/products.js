import { requireAuth, requireAdmin } from "../utils/authMiddleware.js";

import express from "express";
import * as controller from "../controllers/productsController.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:pid", controller.getById);

router.post("/", requireAuth, requireAdmin, controller.create);
router.put("/:pid", requireAuth, requireAdmin, controller.update);
router.delete("/:pid", requireAuth, requireAdmin, controller.remove);
router.post(
	"/:pid/image",
	requireAuth,
	requireAdmin,
	controller.uploadMiddleware,
	controller.uploadImage,
);

export default router;