import DeleteCarteraUseCase from '../../application/deleteCartera_usecase.js';

export const deleteCartera = async (req, res) => {
  try {
    const { id } = req.params;

    const repo = req.app?.locals?.carteraRepository;
    if (!repo) {
      return res.status(500).json({ message: "Repositorio no configurado" });
    }

    const useCase = new DeleteCarteraUseCase(repo);
    const deleted = await useCase.execute({ id });

    if (!deleted) {
      return res.status(404).json({ message: "Cartera no encontrada" });
    }

    res.json({ message: "Cartera eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar cartera:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};