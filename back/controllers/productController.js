const pool = require("../models/db");

// Получение товара по ID
const getProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    if (product.rows.length === 0) {
      return res.status(404).send("Товар не найден");
    }
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

// Получение всех товаров
const getAllProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

module.exports = {
  getProductById,
  getAllProducts,
};
