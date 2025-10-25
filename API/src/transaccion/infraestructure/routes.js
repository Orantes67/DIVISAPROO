import express from "express";
import { createTransaccion } from "./controllers/createTrasaccion_controller.js";
import { updateTransaccion } from "./controllers/updateTrasaccion_controller.js";
import { deleteTransaccion } from "./controllers/deleteTrasaccion_controller.js";
import { listTransaccion } from "./controllers/listTrasaccion_controller.js";
import { convertirDivisa } from "./controllers/convertCurrency_controller.js";

const router = express.Router();

router.post("/", createTransaccion);       // Crear transacción
router.get("/", listTransaccion);          // Listar transacciones (todas o por id_cartera)
router.put("/:id", updateTransaccion);     // Actualizar transacción
router.delete("/:id", deleteTransaccion);  // Eliminar transacción
router.get("/convertir-divisa", convertirDivisa);

export default router;
