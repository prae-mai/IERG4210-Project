import express from "express";
import * as controller from "../controllers/productsController.js";

const router = express.Router();

router.post("/", controller.create);
router.put("/:pid", controller.update);
router.delete("/:pid", controller.remove);

export default router;
