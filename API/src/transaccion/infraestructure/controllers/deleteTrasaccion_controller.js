import DeleteTransaccionUseCase from "../../application/daleteTrasaccion_usecase.js";

export const deleteTransaccion = async (req, res) => {
  try {
    const { id } = req.params;

    const repo = req.app?.locals?.transaccionRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const useCase = new DeleteTransaccionUseCase(repo);
    const result = await useCase.execute(id);

    res.json(result);
  } catch (error) {
    console.error("Error al eliminar transacción:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
