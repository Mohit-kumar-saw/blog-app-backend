const { addUser, login } = require("../controllers/authController");

const Router = require("express").Router();

Router.post("/register",addUser)
Router.post("/login", login);

module.exports = Router;
