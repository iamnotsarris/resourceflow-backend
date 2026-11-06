const Sequelize = require("sequelize");
const connection = require("../database/database.js");

const Diary = connection.define("diary", {
  nome: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  categoria: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  localizacao: {
    // Corrigido erro de digitação (era locacalizacao)
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

module.exports = Diary;
