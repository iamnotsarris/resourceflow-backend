require("dotenv").config();
const Diary = require("../models/diary.models.js");

// Criando Evento
exports.create = async (req, res) => {
  try {
    const { name, description, category, location } = req.body;

    if (!name || !category || !location || !description) {
      return res.status(400).send({ message: "Preencha todos os campos! " });
    }

    const diary = {
      nome: name,
      categoria: category,
      localizacao: location,
      descricao: description,
    };

    const data = await Diary.create(diary);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro ao criar evento.",
    });
  }
};

// Listando Eventos
exports.retrive = async (req, res) => {
  try {
    const data = await Diary.findAll();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro ao buscar eventos no DB.",
    });
  }
};
