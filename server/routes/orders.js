import express from "express";
import { requireAuth } from "../utils/authMiddleware.js";

import * as controller from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", requireAuth, controller.create);

export default router;