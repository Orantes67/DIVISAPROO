import express from "express";
import { createCartera } from "./controllers/createCartera_controller.js";
import { updateCartera } from "./controllers/updateCartera_controller.js";
import { deleteCartera } from "./controllers/deleteCartera_controller.js";
import { listCartera } from "./controllers/listCartera_controller.js";

const router = express.Router();

router.post("/", createCartera);
router.get("/", listCartera);
router.put("/:id", updateCartera);
router.delete("/:id", deleteCartera);

export default router;
