export default class DeleteTransaccionUseCase {
    constructor(transaccionRepo) {
        this.transaccionRepo = transaccionRepo;
    }

    async execute(id_transaccion) {
        if (!id_transaccion) {
            throw new Error("Se requiere el id_transaccion para eliminar la transacción");
        }

        const deleted = await this.transaccionRepo.delete(id_transaccion);
        if (!deleted) {
            throw new Error(`No se pudo eliminar la transacción con id ${id_transaccion}`);
        }

        return { message: "Transacción eliminada correctamente" };
    }
}

