import ICarteraRepository from "../domain/carteraRepository.js";
import Cartera from "../domain/entities/cartera.js";

export default class MySQLCarteraRepository extends ICarteraRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async save(cartera) {
    const [result] = await this.pool.execute(
      "INSERT INTO cartera (saldo_total, moneda_base) VALUES (?, ?)",
      [cartera.saldo_total, cartera.moneda_base]
    );
    cartera.id = result.insertId;
    return new Cartera(cartera);
  }

  async update(cartera) {
    await this.pool.execute(
      "UPDATE cartera SET saldo_total = ?, moneda_base = ? WHERE id_cartera = ?",
      [cartera.saldo_total, cartera.moneda_base, cartera.id]
    );
    // opcional: devolver la entidad actualizada desde BD
    const [rows] = await this.pool.execute(
      "SELECT * FROM cartera WHERE id_cartera = ?",
      [cartera.id]
    );
    return rows[0] ? new Cartera(rows[0]) : null;
  }

  async delete(id) {
    const [result] = await this.pool.execute(
      "DELETE FROM cartera WHERE id_cartera = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  async list() {
    const [rows] = await this.pool.execute("SELECT * FROM cartera");
    return rows.map(r => new Cartera(r));
  }

  async getById(id) {
    const [rows] = await this.pool.execute(
      "SELECT * FROM cartera WHERE id_cartera = ?",
      [id]
    );
    return rows[0] ? new Cartera(rows[0]) : null;
  }
}