const express=require('express');
const {  createComments, getAllcomments, editComment, deleteComment } = require('../controllers/comments.controllers');
const {verifyTokenAndAdmin} =require('../middleware/verifyToken')


const routes=express.Router();


routes.route('/:postId').post(verifyTokenAndAdmin,createComments)
                        .get(getAllcomments)
                        .put(verifyTokenAndAdmin,editComment)
routes.route('/edit-comment/:id').put(verifyTokenAndAdmin,editComment)
routes.route('/delete-comment/:id').delete(verifyTokenAndAdmin,deleteComment)



module.exports=routes