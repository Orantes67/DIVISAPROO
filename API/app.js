import express from "express";
import cors from "cors"; 
import carteraRouter from "./src/cartera/infraestructure/routes.js";
import transaccionRouter from "./src/transaccion/infraestructure/routes.js";
import { initCarteraDependencies } from "./src/cartera/infraestructure/dependencies.js";
import { initTransaccionDependencies } from "./src/transaccion/infraestructure/dependencies.js";

export const app = express();
app.use(cors()); 
app.use(express.json());

// Ruta raíz para verificar que el servidor está corriendo
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

export async function initApp() {
  // inicializar pools y repositorios
  const { carteraRepository } = await initCarteraDependencies();
  const { transaccionRepository } = await initTransaccionDependencies();

  // inyectar repositorios en app.locals para que los controladores los consuman
  app.locals.carteraRepository = carteraRepository;
  app.locals.transaccionRepository = transaccionRepository;

  // montar routers
  app.use("/carteras", carteraRouter);
  app.use("/transacciones", transaccionRouter);
}