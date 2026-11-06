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

// --- CONFIGURAÇÃO DO CORS ---
const allowedOrigins = [
  "https://resource-flow-scholar.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem origem (Postman, etc.) ou se estiver na lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Importante para algumas requisições de preflight
};

// Aplica o CORS em todas as rotas
app.use(cors(corsOptions));

// Responde explicitamente a requisições OPTIONS (Preflight)
// No Express 5, usar regex é a forma segura de pegar todas as rotas
app.options(/(.*)/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao Backend do ResourceFlow." });
});

require("./src/routes/user.routes.js")(app);

module.exports = app;
