require("dotenv").config(); // Necessário para carregar as variáveis
const connection = require("./database.js");

// Importe todos os seus modelos aqui para que o sync os reconheça
require("../models/user.models.js");
require("../models/diary.models.js");

async function syncDatabase() {
  try {
    await connection.sync({ alter: true });
    console.log("✅ Banco de dados sincronizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao sincronizar banco:", error);
  } finally {
    await connection.close(); // Fecha a conexão para o terminal não travar
  }
}

syncDatabase();
