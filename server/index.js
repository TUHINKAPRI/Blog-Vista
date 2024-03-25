const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db.connection");
const authRoutes = require("./routes/auth.routes");
const { globalErrorHandler } = require("./controllers/error.controllers");
const CustomError = require("./utils/CustomErrors");
const userRoutes = require("./routes/user.routes");
const categoriesRoutes = require("./routes/category.routes");
const postRoutes = require("./routes/post.routes");
const commentsRoutes=require('./routes/comments.routes')
const likeRoutes=require('./routes/like.routes.js')
require("dotenv").config();
const path=require("path");

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/posts", postRoutes);
app.use('/api/v1/comments', commentsRoutes);
app.use('/api/v1/like', likeRoutes);
app.get('/uploads/:id',(req,res)=>{
  const img = path.join(__dirname, `./uploads/${req.params.id}`);
  res.sendFile(img);
    
})
app.all("*", (req, res, next) => {
  const err = new CustomError("Page  not found", 404);
  next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000;
connection();
app.listen(PORT, () => {
  console.log(`server is started is port no. ${PORT}`);
});
