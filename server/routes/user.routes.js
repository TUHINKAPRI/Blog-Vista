const express = require("express");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const {
  updateUser,
  deleteUser,
  getAllusers,
  passwordReset,
} = require("../controllers/user.controllers");
const upload = require("../utils/fileUpload");

const userRoutes = express.Router();




userRoutes.route("/").get(verifyTokenAndAdmin, getAllusers).post(verifyToken,passwordReset);
userRoutes
  .route("/:id")
  .patch(verifyToken,upload.single('profilePictute') , updateUser)
  .post(verifyTokenAndAdmin, deleteUser);


  
module.exports = userRoutes;
