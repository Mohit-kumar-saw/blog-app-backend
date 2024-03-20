const {update, deleteUser, getUser } = require("../controllers/userController");

const Router = require("express").Router();

Router.put("/:id", update);
Router.delete("/:id", deleteUser);
Router.get("/:id", getUser);

module.exports = Router;
