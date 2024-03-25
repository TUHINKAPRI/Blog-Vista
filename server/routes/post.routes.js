const express = require("express");
const {
  createPost,
  getAllPost,
  editPost,
  deletePost,
  getUserPost,
} = require("../controllers/post.controllers");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const upload = require("../utils/fileUpload");

const postRouter = express.Router();

postRouter
  .route("/")
  .get(getAllPost)
  .post(verifyTokenAndAdmin, upload.single("image"), createPost);
postRouter
  .route("/:id")
  .get(verifyToken, getUserPost)
  .put(verifyTokenAndAdmin , upload.single("image"), editPost)
  .delete(verifyTokenAndAdmin, deletePost);

module.exports = postRouter;
