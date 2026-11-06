// index.js
require("dotenv").config(); // Carrega o .env ANTES de tudo

const express = require("express");
const cors = require("cors");
const app = express();

const connection = require("./src/database/database.js");
require("./src/models/user.models.js"); // Importa para registrar o modelo
require("./src/models/diary.models.js"); // Importa para registrar o modelo

// Sincronização do banco (Cria as tabelas se não existirem)
connection
  .sync()
  .then(() => console.log("Banco de dados sincronizado."))
  .catch((err) => console.error("Erro ao sincronizar banco:", err));

// Configurações
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao Backend do ResourceFlow." });
});

// Rotas
require("./src/routes/user.routes.js")(app);
// Se você tiver um diary.routes.js, descomente abaixo:
// require("./src/routes/diary.routes.js")(app);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
