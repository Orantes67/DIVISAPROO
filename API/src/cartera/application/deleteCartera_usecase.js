export default class DeleteCarteraUseCase {
    constructor(carteraRepo) {
        this.carteraRepo = carteraRepo;
    }

    async execute({ id }) {
        return await this.carteraRepo.delete(id);
    }
}