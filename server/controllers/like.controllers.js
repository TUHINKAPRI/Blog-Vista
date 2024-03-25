const Comments = require("../models/comments.models");
const CustomError = require("../utils/CustomErrors");


exports.commentLike=async(req,res,next)=>{
  
  try{
        const findComment=await Comments.findOne({_id:req.params.commentId})
        if(!findComment){
          return next(new CustomError('No comment found',404))
        }
        const findIndex=findComment.likes.findIndex((ele)=>ele.userId===req.id)

        if(findIndex==-1){
            findComment.likes.push({userId:req.id})
            findComment.numberOfLikes=findComment.likes.length
        }else{
          findComment.likes.splice(findIndex,1)
          findComment.numberOfLikes=findComment.likes.length
        }
        const dat=await findComment.save();
        const comment=await Comments.findOne({_id:req.params.commentId}).populate('userId')
        res.status(200).json({
          status:'success',
          message:'like successfully created',
          data:comment
        })

  }catch(err){
    next(err)
  }
}



// exports.commentLike = async (req, res, next) => {
//   try {
//     const findComment = await Comments.findOne({ _id: req.params.commentId });
//     if (!findComment) {
//       return next(new CustomError("No comment found", 404));
//     }

//     const findLike = await Like.findOne({
//       userId: req.id,
//       commentId: req.params.commentId,
//     });
//     console.log(findLike);
//     if (!findLike) {
//       findComment.numberOfLikes=+1
//       const like = await Like.create({
//         userId: req.id,
//         commentId: req.params.commentId,
//       });
//       await findComment.save()
//       const com=await Comments.find({_id:req.params.commentId})
//       console.log(com)
//       res.status(200).json({
//         message: "successfully Like",
//         data: like,
//       });
//     } else {
//       const like = await Like.findOneAndDelete(
//         {
//           userId: req.id,
//           commentId: req.params.commentId,
//         },
//         { new: true }
//       );
//         findComment.numberOfLikes=-1
//         await findComment.save()
//       res.status(200).json({
//         message: "sussfully removerd",
//         data: like,
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getAllLikeForAComments = async (req, res, next) => {
//   try {
//     const findComment = await Comments.find({ _id: req.params.commentId });
//     if (!findComment) {
//       return next(new CustomError("comment not found ", 404));
//     }
//     const like = await Like.find({ commentId: req.params.commentId });
//     res.status(200).json({
//       status: "success",
//       message: "like fetch successfully",
//       data: like,
//     });
//   } catch (err) {
//     next(err)
//   }
// };
