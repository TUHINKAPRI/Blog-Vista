const express=require('express');
const { createCategory, getAllCategories, deleteCategory, editCategory } = require('../controllers/categories.controllers');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');
const CategoryRoutes=express.Router()


CategoryRoutes.route('/').post(verifyTokenAndAdmin ,createCategory)
.get(getAllCategories)
CategoryRoutes.route('/:id').delete(verifyTokenAndAdmin,deleteCategory)
.patch(verifyTokenAndAdmin,editCategory)




module.exports=CategoryRoutes