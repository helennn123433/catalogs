const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
