const Sequelize = require("sequelize");
const connect = new Sequelize("resourceflow", "root", "0123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connect;
