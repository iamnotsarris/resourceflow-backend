const jwt = require("jsonwebtoken"); // Importação que estava faltando

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Formato de token inválido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Token inválido ou expirado." });
    }

    req.user = user;
    next();
  });
}

module.exports = authToken;
