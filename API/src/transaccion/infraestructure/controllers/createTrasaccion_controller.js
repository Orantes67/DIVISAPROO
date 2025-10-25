import CreateTransaccionUseCase from "../../application/createTrasaccion_usecase.js";

export const createTransaccion = async (req, res) => {
  try {
    const repo = req.app?.locals?.transaccionRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const { id_cartera, tipo, monto, divisa, tasa_cambio, descripcion } = req.body;

    const useCase = new CreateTransaccionUseCase(repo);
    const result = await useCase.execute({
      id_cartera,
      tipo,
      monto,
      divisa,
      tasa_cambio,
      descripcion,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error al crear transacción:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
