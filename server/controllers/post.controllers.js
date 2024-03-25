const Post = require("../models/post.models");
const User = require("../models/user.model");
const CustomError = require("../utils/CustomErrors");

exports.createPost = async (req, res, next) => {
  try {
    const newPost = await Post.create({
      userId: req.id,
      title: req.body.title,
      content: req.body.content,
      image: req.file.filename,
      category: req.body.category,
    });

    res.status(200).json({
      status: "success",
      message: "post created successfully",
      post: newPost,
    });
  } catch (err) {
    next(err);
  }
};
//get all posts
exports.getAllPost = async (req, res, next) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";
  const sort = req.query.sort || "createdAt";
  try {
    console.log(req.query);
    let queryStr = {};
    // if(req.query._id){
    //    queryStr={_id:{$in:req.query._id.split(',')}}
    //   console.log(queryStr)
    // }
    let obj = {};

    for (let key in req.query) {
      if (key === "_id") {
        let val = { [key]: { $in: req.query[key].split(",") } };
        obj = { ...obj, ...val };
      } else {
        obj = { ...{ [key]: req.query[key] }, ...obj };
      }
    }

    console.log(obj);

    if (req.query.PostId) {
      const findPost = await Post.findOne({ _id: req.query.PostId });
      if (!findPost) {
        return next(new CustomError("post not found", 404));
      }
    }
    const allPosts = await Post.find({
      ...(req.query.postId && { _id: req.query.postId }),
      ...obj,
    }).populate("category");
    const totalPosts = await Post.countDocuments();
    res.status(200).json({
      status: "success",
      data: allPosts,
      totalPosts: totalPosts,
    });
  } catch (err) {
    next(err);
  }
};

// exports.getAllPost = async (req, res, next) => {
//   const startIndex = req.query.startIndex || 0;
//   const limit = req.query.limit || 9;
//   try {
//     const allPost = await Post.find({
//       ...(req.query.userId && { userId: req.query.userId }),
//       ...(req.query.postId && { _id: req.query.postId }),
//       ...(req.query.category && { category: req.query.category }),
//       ...(req.query.search && {
//         $or: [
//           { title: { $regex: req.query.search, $options: "i" } },
//           { content: { $regex: req.query.search, $options: "i" } },
//         ],
//       }),
//     })
//       .sort({ updatedAt: 1 })
//       .skip(startIndex)
//       .limit(limit).populate('category');
//     const totalPost = await Post.countDocuments();
//     res.status(200).json({
//       status: "success",
//       message: "Fetching all posts",
//       data: allPost,
//       totalPost,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

exports.getUserPost = async (req, res, next) => {
  if (req.params.id !== req.id) {
    return next(new CustomError("You can not do that without same id", 403));
  }
  const findUser = await User.findOne({ _id: req.id });
  if (!findUser) {
    return next(new CustomError("user not found", 404));
  }
  try {
    const userPost = await Post.find({ userId: req.id }).populate("category");
    const totalUserPost = userPost?.length ? userPost.length : 0;
    res.status(200).json({
      status: "success",
      message: "Fetching user all posts",
      data: userPost,
      totalPosts: totalUserPost,
    });
  } catch (err) {
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const findPost = await Post.findOne({ _id: req.params.id });
    if (!findPost) {
      return next(new CustomError("post not found", 404));
    }
    if (findPost.userId.toString() == req.id || req.isAdmin) {
      const post = await Post.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
            ...(req.file && { image: req.file.filename }),
          },
        },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        message: "post edited successfully",
        editedPost: post,
      });
    } else {
      return next(new CustomError("you cant do this", 402));
    }
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const findPost = await Post.findOne({ _id: req.params.id });
    if (!findPost) {
      return next(new CustomError("post not found ", 404));
    }
    if (findPost.userId.toString() === req.id || req.isAdmin) {
      const deletedPost = await Post.findByIdAndDelete(
        { _id: req.params.id },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        message: "post deleted successfully",
        data: deletedPost,
      });
    } else {
      return next(new CustomError("you cant not do that", 403));
    }
  } catch (err) {
    next(err);
  }
};
