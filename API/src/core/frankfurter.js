import fetch from "node-fetch"; 

const BASE_URL = "https://api.frankfurter.dev/v1";

/**
 * Convierte una cantidad de una divisa a otra usando la API de Frankfurter.
 * @param {string} from - Código de moneda origen (por ejemplo, 'EUR')
 * @param {string} to - Código de moneda destino (por ejemplo, 'USD')
 * @param {number} amount - Cantidad a convertir
 * @returns {Promise<{convertedAmount: number, rate: number}>}
 */
export async function convertCurrency(from, to, amount) {
  try {
    const response = await fetch(`${BASE_URL}/latest?base=${from}&symbols=${to}`);
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    const rate = data.rates[to];

    if (!rate) throw new Error(`No se encontró tasa para ${to}`);

    const convertedAmount = parseFloat((amount * rate).toFixed(2));

    return { convertedAmount, rate };
  } catch (err) {
    console.error("❌ Error al convertir divisa:", err.message);
    throw err;
  }
}
