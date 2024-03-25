
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select:false
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture:{
      type:String,
      default:'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705968000&semt=ais'
    }
  },
  {
    timestamps: true,
  }
);

const User=mongoose.model("User",userSchema)

module.exports=User;
