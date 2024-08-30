const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "category_test",
  password: "lena123R",
  port: 5432,
});

module.exports = pool;
