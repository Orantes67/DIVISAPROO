export default class ListCarteraUseCase {
    constructor(carteraRepo) {
        this.carteraRepo = carteraRepo;
    }

    async execute() {
        return await this.carteraRepo.list();
    }
}