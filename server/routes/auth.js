import {
	register,
	login,
	logout,
	changePasswordHandler,
	me,
} from "../controllers/authController.js";
import { requireAuth } from "../utils/authMiddleware.js";

import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/change-password", requireAuth, changePasswordHandler);
router.get("/me", requireAuth, me);


export default router;
