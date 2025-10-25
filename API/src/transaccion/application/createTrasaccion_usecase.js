export default class CreateTransaccionUseCase {
    constructor(transaccionRepo) {
        this.transaccionRepo = transaccionRepo;
    }

    async execute({ id_cartera, tipo, monto, divisa, tasa_cambio, descripcion }) {
        if (!id_cartera || !tipo || !monto || !divisa) {
            throw new Error("Faltan campos obligatorios para crear la transacción");
        }

        const transaccion = {
            id_cartera,
            tipo,
            monto,
            divisa,
            tasa_cambio: tasa_cambio || 1.0,
            descripcion
        };

        return await this.transaccionRepo.save(transaccion);
    }
}