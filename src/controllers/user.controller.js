require("dotenv").config();
const User = require("../models/user.models.js");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  try {
    const { name, email, password, telefone, cpf, bio } = req.body;

    if (!name || !email || !password || !telefone || !cpf) {
      return res.status(400).send({ message: "Preencha todos os campos!" });
    }

    const user = {
      nome: name,
      email: email,
      password: password,
      telefone: telefone,
      cpf: cpf,
      bio: bio || "",
      cargo: "Usuario",
    };

    const data = await User.create(user);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro ao criar usuário.",
    });
  }
};

// Rota de Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    if (user.password !== password) {
      return res.status(401).send({ message: "Senha inválida." });
    }

    // Criação do Token
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email, cargo: user.cargo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login realizado com sucesso.",
      token: token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro ao realizar Login.",
    });
  }
};

// Buscar usuário por id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).send({ message: "Usuário não encontrado " });
    }

    res.send({
      id: user.id,
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      cpf: user.cpf,
      cargo: user.cargo,
      bio: user.bio,
      avatar: user.avatar,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar usuário com id=" + id });
  }
};
