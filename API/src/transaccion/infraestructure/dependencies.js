import { getDBPool } from "../../core/mysql.js";
import MySQLTransaccionRepository from "./mysql.js";

export async function initTransaccionDependencies() {
  const pool = await getDBPool();
  const transaccionRepository = new MySQLTransaccionRepository(pool);
  return { transaccionRepository };
}