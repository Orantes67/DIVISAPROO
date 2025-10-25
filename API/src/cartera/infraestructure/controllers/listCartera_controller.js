
import ListCarteraUseCase from '../../application/listCartera_usecase.js';

export const listCartera = async (req, res) => {
  try {
    const repo = req.app?.locals?.carteraRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const useCase = new ListCarteraUseCase(repo);
    const rows = await useCase.execute();

    res.json(rows);
  } catch (error) {
    console.error("Error al listar carteras:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
