const User = require("../models/user.model");
const Post = require("../models/post.models");
const CustomError = require("../utils/CustomErrors");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");
const bcryptjs = require("bcryptjs");

exports.updateUser = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body.username === true);
  if (!req.id === req.params.id) {
    return next(new CustomError("id not match", 401));
  }
  if (!req.body.password) {
    return next(new CustomError("password is requitred", 401));
  }
  const findUser = await User.findById(req.params.id).select("+password");

  if (!findUser) {
    return next(new CustomError("user not found", 404));
  }
  const isMatch = bcryptjs.compareSync(req.body.password, findUser.password);

  if (!isMatch) {
    return next(new CustomError("password is incorrect", 404));
  }

  if (req.body.username) {
    if (req.body.username.length < 6) {
      return next(new CustomError("username must be 5", 401));
    }
    if (req.body.username.includes(" ")) {
      return next(new CustomError("username can't contain space ", 401));
    }
    if (!req.body.username === req.body.username.toLowerCase()) {
      return next(new CustomError("username must lowsercase", 401));
    }
  }
  let setData = {};
 
  Object.keys(req.body).forEach((ele)=>{
    if(req.body[ele]!=='undefined'&&req.body[ele]!=='null'&&ele!=='password'){
      console.log(ele)
     setData[ele]=req.body[ele]
    }
  })
  if (req.file) {
    setData={...setData,profilePicture:req.file.filename}
   
  }
 

  const user = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
       ...setData
      },
    },
    { new: true }
  );
  console.log(user);
  res.status(200).json({
    message: "update successfully",
    data: user,
  });
});

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const findUser = await User.findById({ _id: req.params.id }).select(
    "+password"
  );
  if (!findUser) {
    return next(new CustomError("User not Found ", 403));
  }
  if (req.isAdmin) {
    const user = await User.findByIdAndDelete(
      { _id: req.params.id },
      { new: true }
    );
    await Post.deleteMany({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: user,
    });
  } else {
    if (!req.body.password) {
      return next(new CustomError("You can not do that without password", 403));
    }

    const isMatch = bcryptjs.compareSync(req.body.password, findUser.password);
    if (!isMatch) {
      return next(new CustomError("Invalid password", 403));
    }
    await User.findByIdAndDelete({ _id: req.params.id });
    await Post.deleteMany({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  }
});

exports.getAllusers = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(new CustomError("You must be an admin", 402));
  }
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      status: "success",
      message: "fetch all users successfully",
      data: allUsers,
    });
  } catch (err) {
    next(err);
  }
};

exports.passwordReset = async (req, res, next) => {
  const { password } = req.body;
  try {
    const findUser = await User.findOne({ _id: req.id });
    if (!findUser) {
      return next(new CustomError("User not found", 404));
    }
    const hashPassword = bcryptjs.hashSync(req.body.password);
    findUser.password = hashPassword;
    const user = await findUser.save();
    res.status(200).json({
      status: "success",
      message: "password reset was successful",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
