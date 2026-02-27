import express from "express";
import * as controller from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:catid", controller.update);
router.delete("/:catid", controller.remove);

export default router;
