import { getDBPool } from "../../core/mysql.js";
import MySQLCarteraRepository from "./mysql.js";

export async function initCarteraDependencies() {
  const pool = await getDBPool();
  const carteraRepository = new MySQLCarteraRepository(pool);
  return { carteraRepository };
}