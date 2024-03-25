const express=require('express');
const { signup, signin, google } = require('../controllers/auth.controllers');
const authRouter=express.Router()
const upload=require('../utils/fileUpload')


authRouter.route('/signup').post(upload.single('profilePicture'),signup)
authRouter.route('/signin').post(signin)
authRouter.route('/google').post(google)


module.exports=authRouter