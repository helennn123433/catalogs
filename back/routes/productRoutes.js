const express = require("express");
const router = express.Router();
const {
  getProductById,
  getAllProducts,
} = require("../controllers/productController");

router.get("/:id", getProductById);
router.get("/", getAllProducts);

module.exports = router;
