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

// Listando todos os Eventos
exports.findAll = async (req, res) => {
  try {
    const data = await Diary.findAll();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro ao buscar eventos no DB.",
    });
  }
};

// Listando eventos por Id {
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Diary.findByPk(id);

    if (!data) {
      return res
        .status(404)
        .send({ message: `Èvento não encontrado com id ${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: `Evento não encontrado com o id=${req.params.id}` });
  }
};

// Atualizando eventos por id
exports.update = async (req, res) => {
  try {
    const { name, description, category, location } = req.body;
    const updateData = {};

    if (name) updateData.nome = nome;
    if (description) updateData.nome = description;
    if (category) updateData.nome = category;
    if (location) updateData.nome = location;

    const num = await Diary.update(updateData, {
      where: { id: id },
    });

    if ((num = 1)) {
      res.status(200).send({ message: `Evento atualizado com sucesso!` });
    } else {
      res.status(400).send({
        message: `Não foi possivel atualizar o evento com id ${req.params.id}. O evento pode não ter sido encontrado ou o corpo da requisição está vazio!`,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: `Erro ao atualizar o evento com id=${req.params.id}` });
  }
};

// Deletando eventos por id
exports.detele = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Diary.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.status(200).send({ message: "Evento deletado com sucesso!" });
    } else {
      res.status(400).send({
        message: `Não foi possível deletar o evento com id=${id}. O evento pode não ter sido encontrado!`,
      });
    }
  } catch (err) {
    res.status(400).send({
      message: `Não foi possível deletar o evento com id=${req.params.id}.`,
    });
  }
};
