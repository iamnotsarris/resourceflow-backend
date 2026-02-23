const connection = require("../database/database.js");
require("../models/user.models.js");

connection.sync({ alter: true });
