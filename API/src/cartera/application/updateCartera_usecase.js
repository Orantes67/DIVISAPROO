 export default class UpdateCarteraUseCase {
    constructor(carteraRepo) {
        this.carteraRepo = carteraRepo;
    }

    async execute({ id, saldo_total, moneda_base }) {
        const cartera = { id, saldo_total, moneda_base };
        return await this.carteraRepo.update(cartera);
    }
}

