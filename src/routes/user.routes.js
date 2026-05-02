module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Rota para criar um novo usuário
  router.post("/", users.create);
  // Rota para realizar o login
  router.post("/login", users.login);

  // Rota para realizar busca de usuario por id
  router.get("/:id", users.findOne);

  // Define a URL base: http://localhost:3000/api/users
  app.use("/api/users", router);
};
