const CustomError = require("../utils/CustomErrors");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");

exports.signup = asyncErrorHandler(async (req, res, next) => {
  
  const { username, email, password } = req.body;
console.log(req.body)
  if (!username || username?.trim() == "") {
    const err = new CustomError("Username is required", 400);
    return next(err);
  }
  if (!email || email?.trim() === "") {
    const err = new CustomError("Email is required", 400);
    return next(err);
  }
  if (!password) {
    const err = new CustomError("Password is required", 400);
    return next(err);
  }
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
    profilePicture:req.file?.filename
  });

  await newUser.save();
  console.log(newUser)
  res.status(200).json({
    status: "success",
    message: "Accout created successfully",
    data:newUser
  });
});

exports.signin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //if not presend then send error message
  if (!email || !password) {
    return next(new CustomError("Both fields is required", 400));
  }
  //if presend then find the valid user
  const userData = await User.findOne({ email: email }).select("+password");
  //if not valid user then send error message
  if (!userData) {
    return next(new CustomError("user not found ", 400));
  }
  //if found out the user then compare the password
  const isMatch = bcryptjs.compareSync(password, userData.password);
  //if not match the password anbd dbpassword then send the rror message
  if (!isMatch) {
    return next(new CustomError("password incorrect", 400));
  }
  //create a token by using the secrect kry and payload data
  const token = createToken({ id: userData._id,isAdmin:userData.isAdmin});
  //extract the rest without the password
  const { password: pass, ...rest } = userData._doc;
  //send the user data without password and the token
  res.status(200).json({
    status: "success",
    message: "Login Successfully",
    data: rest,
    token,
  });
});

exports.google = asyncErrorHandler(async (req, res, next) => {
  const { username, email,profilePicture } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    const token = createToken({ id: findUser._id,isAdmin:findUser.isAdmin });
    const { password: pass, ...rest } = findUser._doc;
    res.status(200).json({
      status: "success",
      message: "Login Successfully",
      data: rest,
      token,
    });
  } else {
    const hashPassword = bcryptjs.hashSync(generateRandomString(10), 10);
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashPassword,
      
    });
    const token = createToken({ id: newUser._id,isAdmin:newUser.isAdmin });
    const { password: pass, ...rest } = newUser._doc;
    res.status(200).json({
      status: "success",
      message: "Accout is successfully created",
      data: rest,
      token,
    });
  }
});

//function for creating the token
const createToken = (user) => {
  return jwt.sign(user, process.env.SECRECT_KEY);
};

//generate random password
function generateRandomString(length) {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var randomString = "";
  for (var i = 0; i < length; i++) {
    var randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    randomString += randomCharacter;
  }
  return randomString;
}
