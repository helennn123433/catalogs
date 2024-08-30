const pool = require("../models/db");

const getCategories = async (req, res) => {
  try {
    const categories = await pool.query(`
      WITH RECURSIVE CategoryHierarchy AS (
        SELECT 
          id AS category_id,
          name AS category_name,
          parent_id
        FROM categories
        WHERE parent_id IS NULL
        UNION ALL
        SELECT 
          c.id,
          c.name,
          c.parent_id
        FROM categories c
        INNER JOIN CategoryHierarchy ch ON c.parent_id = ch.category_id
      )
      SELECT 
        ch.category_id,
        ch.category_name,
        ch.parent_id,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'product_id', p.id,
              'product_name', p.name,
              'price', p.price
            )
          ) FILTER (WHERE p.id IS NOT NULL), '[]'
        ) AS products,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'category_id', sub.id,
              'category_name', sub.name,
              'parent_id', sub.parent_id
            )
          ) FILTER (WHERE sub.id IS NOT NULL), '[]'
        ) AS children
      FROM CategoryHierarchy ch
      LEFT JOIN product_categories pc ON ch.category_id = pc.category_id
      LEFT JOIN products p ON pc.product_id = p.id
      LEFT JOIN categories sub ON sub.parent_id = ch.category_id
      GROUP BY ch.category_id, ch.category_name, ch.parent_id
      ORDER BY ch.category_id;
    `);

    res.json(categories.rows);
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = {
  getCategories,
};
