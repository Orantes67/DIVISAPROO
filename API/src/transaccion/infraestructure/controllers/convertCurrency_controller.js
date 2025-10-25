import { convertCurrency } from "../../../core/frankfurter.js";

export const convertirDivisa = async (req, res) => {
  try {
    const { from, to, amount } = req.query;
    if (!from || !to || !amount) {
      return res.status(400).json({ message: "Parámetros requeridos: from, to, amount" });
    }
    const result = await convertCurrency(from, to, parseFloat(amount));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};