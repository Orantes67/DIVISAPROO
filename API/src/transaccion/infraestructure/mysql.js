import { ITransaccionRepository } from "../domain/transaccionRepository.js";
import Transaccion from "../domain/entities/transaccion.js";

export default class MySQLTransaccionRepository extends ITransaccionRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async save(transaccion) {
    const { id_cartera, tipo, monto, divisa, tasa_cambio, descripcion } = transaccion;

    const [result] = await this.pool.execute(
      `INSERT INTO transaccion (id_cartera, tipo, monto, divisa, tasa_cambio, descripcion)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_cartera, tipo, monto, divisa, tasa_cambio, descripcion]
    );

    const [rows] = await this.pool.execute(
      `SELECT * FROM transaccion WHERE id_transaccion = ?`,
      [result.insertId]
    );

    return new Transaccion(rows[0]);
  }

  async update(id_transaccion, transaccion) {
    const { tipo, monto, divisa, tasa_cambio, descripcion } = transaccion;

    await this.pool.execute(
      `UPDATE transaccion 
       SET tipo = ?, monto = ?, divisa = ?, tasa_cambio = ?, descripcion = ?
       WHERE id_transaccion = ?`,
      [tipo, monto, divisa, tasa_cambio, descripcion, id_transaccion]
    );

    const [rows] = await this.pool.execute(
      `SELECT * FROM transaccion WHERE id_transaccion = ?`,
      [id_transaccion]
    );

    if (rows.length === 0) return null;
    return new Transaccion(rows[0]);
  }

  async delete(id_transaccion) {
    const [result] = await this.pool.execute(
      `DELETE FROM transaccion WHERE id_transaccion = ?`,
      [id_transaccion]
    );
    return result.affectedRows > 0;
  }

  async findAll() {
    const [rows] = await this.pool.execute(`SELECT * FROM transaccion`);
    return rows.map(row => new Transaccion(row));
  }

  async findById(id_transaccion) {
    const [rows] = await this.pool.execute(
      `SELECT * FROM transaccion WHERE id_transaccion = ?`,
      [id_transaccion]
    );

    if (rows.length === 0) return null;
    return new Transaccion(rows[0]);
  }

  async findByCarteraId(id_cartera) {
    const [rows] = await this.pool.execute(
      `SELECT * FROM transaccion WHERE id_cartera = ? ORDER BY fecha_transaccion DESC`,
      [id_cartera]
    );

    return rows.map(row => new Transaccion(row));
  }
}