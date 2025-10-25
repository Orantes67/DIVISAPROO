import ListTransaccionUseCase from "../../application/listTrasaccion_usecase.js";

export const listTransaccion = async (req, res) => {
  try {
    const { id_cartera } = req.query;

    const repo = req.app?.locals?.transaccionRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const useCase = new ListTransaccionUseCase(repo);
    const result = await useCase.execute({ id_cartera });

    res.json(result);
  } catch (error) {
    console.error("Error al listar transacciones:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
