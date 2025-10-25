export default class CreateCarteraUseCase {
    constructor(carteraRepo) {
        this.carteraRepo = carteraRepo;
    }

    async execute({ saldo_total, moneda_base }) {
        const cartera = { saldo_total, moneda_base };
        return await this.carteraRepo.save(cartera);
    }
}