import { app, initApp } from "./app.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initApp();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Bootstrap error:", err);
    process.exit(1);
  }
})();