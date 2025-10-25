import UpdateCarteraUseCase from "../../application/updateCartera_usecase.js";

export const updateCartera = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // usar el repositorio correcto inyectado en app.locals
    const repo = req.app?.locals?.carteraRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const useCase = new UpdateCarteraUseCase(repo);
    // el usecase espera un objeto { id, saldo_total, moneda_base }
    const updated = await useCase.execute({ id, ...data });

    if (!updated) {
      return res.status(404).json({ message: "Cartera no encontrada" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar cartera:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
