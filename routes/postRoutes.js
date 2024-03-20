const {
  addPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost,
  category,
} = require("../controllers/postController");
const { protect } = require("../middleWare/authMiddleware");

const Router = require("express").Router();

Router.get("/",protect, getAllPost);
Router.get("/:username",protect, getPost);
Router.post("/add",protect, addPost);
Router.put("/:id",protect, updatePost);
Router.delete("/:id",protect, deletePost);
Router.delete("/category", category);

module.exports = Router;
