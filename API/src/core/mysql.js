import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function getDBPool() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    console.log("✅ Conexión a MySQL establecida exitosamente.");
    return pool;
  } catch (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
    return null;
  }
}

// Ejecutar consultas preparadas
export async function executePreparedQuery(pool, query, values = []) {
  try {
    const [result] = await pool.execute(query, values);
    return result;
  } catch (err) {
    console.error("❌ Error al ejecutar consulta preparada:", err.message);
    throw err;
  }
}

// Consultas SELECT
export async function fetchRows(pool, query, values = []) {
  try {
    const [rows] = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error("❌ Error al ejecutar SELECT:", err.message);
    throw err;
  }
}
