const Category=require('../models/categories.models')
const {asyncErrorHandler} =require('../utils/asyncErrorHandler')


exports.createCategory=asyncErrorHandler(async(req,res,next)=>{
  console.log(req.body)
  if(!req.body.title){
    return next(new CustomError('send the title',400))
  }
  const category=await  Category.create({
    title: req.body.title
  });
  res.status(200).json({
    status: 'success',
    message:'category created successfully',
    data:category

  })
 
})

exports.getAllCategories=async(req,res,next)=>{
  try{
    const getAll=await Category.find({})
    res.status(200).json({
      status:'success',
      message:'fetch Successfully',
      data:getAll
    })
  }catch(err){
    next(err)
  }
}

exports.deleteCategory=async(req,res,next)=>{
  const {id}=req.params;
  try{
    
      const category=await Category.findByIdAndDelete({_id:id},{new:true});
      res.status(200).json({
        status:'success',
        message:'deleted successfully',
        data:category
      })
  }catch(err){
    next(err)
  }
}
exports.editCategory=async(req,res,next)=>{
  try{
    const editedCategory=await Category.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    res.status(200).json({
      status:'success',
      message:'Upadted successfully',
      data:editedCategory
    })
  }catch(err){
    next(err)
  }
}