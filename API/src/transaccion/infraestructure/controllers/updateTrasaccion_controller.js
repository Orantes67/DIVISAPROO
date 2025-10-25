import UpdateTransaccionUseCase from "../../application/updateTrasaccion_usecase.js";

export const updateTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const repo = req.app?.locals?.transaccionRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const useCase = new UpdateTransaccionUseCase(repo);
    const updated = await useCase.execute(id, data);

    if (!updated) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar transacción:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
