// index.js
require("dotenv").config();

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

// O CORS agora é tratado primariamente pelo vercel.json na Vercel.
// Para o ambiente local, o cors() básico já resolve.
app.use(
  cors({
    origin: "https://resource-flow-scholar.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao Backend do ResourceFlow." });
});

require("./src/routes/user.routes.js")(app);

module.exports = app;
