const mongoose=require('mongoose');
const categoriesSchema=new mongoose.Schema({
  title:{
    type:String,
    unique:true,
    required:[true,'title is required']
  },
  number:{
    type:Number,
    default:0
  } 
})


const Category=mongoose.model('Category',categoriesSchema);

module.exports = Category