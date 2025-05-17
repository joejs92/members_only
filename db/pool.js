const { Pool } = require("pg");
require('dotenv').config();

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: `${process.env.USER}`,
  database: `${process.env.DATABASE}`,
  password: `${process.env.PASSWORD}`,
  port: 5432 // The default port
});