const Sequelize = require("sequelize");
const connection = require("../database/database.js");

const User = connection.define("user", {
  nome: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING(14),
    allowNull: false,
  },
  cargo: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  bio: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  // avatar: {
  //   type: Image
  // }
});

module.exports = User;
