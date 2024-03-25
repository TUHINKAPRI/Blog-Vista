const express=require('express');
const { commentLike, getAllLikeForAComments } = require('../controllers/like.controllers');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');
const LikeRouter=express.Router();


//add a like for a comment
LikeRouter.route('/comment/:commentId').post(verifyTokenAndAdmin,commentLike)
                                        // .get(getAllLikeForAComments)

module.exports=LikeRouter
