import { requireAuth, requireAdmin } from "../utils/authMiddleware.js";

import express from "express";
import * as controller from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/", controller.getAll);

router.post("/", requireAuth, requireAdmin, controller.create);
router.put("/:catid", requireAuth, requireAdmin, controller.update);
router.delete("/:catid", requireAuth, requireAdmin, controller.remove);


export default router;
