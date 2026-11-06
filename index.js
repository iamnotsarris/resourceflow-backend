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

// --- CONFIGURAÇÃO DO CORS ---
const allowedOrigins = [
  "https://resource-flow-scholar.vercel.app", // Seu frontend na Vercel
  "http://localhost:5173", // Vite local (para testes)
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requisições sem origem (Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
