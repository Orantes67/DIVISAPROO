export default class UpdateTransaccionUseCase {
    constructor(transaccionRepo) {
        this.transaccionRepo = transaccionRepo;
    }

    async execute(id_transaccion, data) {
        if (!id_transaccion) {
            throw new Error("Se requiere el id_transaccion para actualizar");
        }

        const existing = await this.transaccionRepo.findById(id_transaccion);
        if (!existing) {
            throw new Error(`Transacción con id ${id_transaccion} no encontrada`);
        }

        const updated = { ...existing, ...data };
        return await this.transaccionRepo.update(id_transaccion, updated);
    }
}

