import CreateCarteraUseCase from '../../application/createCartera_usecase.js';

export const createCartera = async (req, res) => {
  try {
    const { saldo_total, moneda_base } = req.body;

    if (saldo_total === undefined || !moneda_base) {
      return res.status(400).json({ message: "saldo_total y moneda_base son requeridos" });
    }

    const repo = req.app?.locals?.carteraRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const useCase = new CreateCarteraUseCase(repo);
    const saved = await useCase.execute({ saldo_total, moneda_base });

    res.status(201).json({ message: "Cartera creada", id: saved.id });
  } catch (error) {
    console.error("Error al crear cartera:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
