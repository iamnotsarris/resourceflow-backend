require("dotenv").config();
const Sequelize = require("sequelize");

const connect = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres", // Configurado para o Neon
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
);

module.exports = connect;
