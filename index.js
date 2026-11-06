// index.js
require("dotenv").config(); // Mantenha esta linha

const express = require("express");
const cors = require("cors");
const app = express();

const connection = require("./src/database/database.js");
require("./src/models/user.models.js");
require("./src/models/diary.models.js");

connection
  .sync()
  .then(() => console.log("Banco de dados sincronizado."))
  .catch((err) => console.error("Erro ao sincronizar banco:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao Backend do ResourceFlow." });
});

require("./src/routes/user.routes.js")(app);
module.exports = app;
