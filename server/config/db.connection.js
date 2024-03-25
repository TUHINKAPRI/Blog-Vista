const mongoose = require("mongoose");
require('dotenv').config();
async function connection() {
  await mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("db connection is faild");
    });
}

module.exports=connection
