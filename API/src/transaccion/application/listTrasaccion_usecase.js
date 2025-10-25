export default class ListTransaccionUseCase {
    constructor(transaccionRepo) {
        this.transaccionRepo = transaccionRepo;
    }

    async execute({ id_cartera } = {}) {
        if (id_cartera) {
            return await this.transaccionRepo.findByCarteraId(id_cartera);
        }
        return await this.transaccionRepo.findAll();
    }
}

