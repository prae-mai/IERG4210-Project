import express from "express";
import * as controller from "../controllers/productsController.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:pid", controller.getById);
router.post("/", controller.create);
router.put("/:pid", controller.update);
router.delete("/:pid", controller.remove);
router.post("/:pid/image", controller.uploadMiddleware, controller.uploadImage);

export default router;