import express from "express";
import { requireAuth } from "../utils/authMiddleware.js";

import * as controller from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", requireAuth, controller.create);
router.post("/checkout-session", requireAuth, controller.createCheckoutSession);
router.post("/webhook", controller.handleStripeWebhook);

router.get("/my", requireAuth, controller.getAllByUser);
router.get("/", requireAuth, controller.getAll);
router.get("/:id", requireAuth, controller.getById);

export default router;