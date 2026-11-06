module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Rota para criar um novo usuário
  router.post("/", users.create);

  // Rota para realizar o login
  router.post("/login", users.login);

  // Rota para buscar usuário por id
  router.get("/:id", users.findOne);

  // Rota para atualizar o perfil (Adicionada para o frontend funcionar)
  router.put("/:id", users.update);

  // Define a URL base: http://localhost:3000/api/users
  app.use("/api/users", router);
};
