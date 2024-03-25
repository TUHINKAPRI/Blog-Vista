const Comments = require("../models/comments.models");
const CustomError = require("../utils/CustomErrors");
exports.createComments = async (req, res, next) => {
  console.log(req.body, 88);
  try {
    const newComments = await Comments.create({
      userId: req.id,
      postId: req.params.postId,
      content: req.body.content,
    });
    const commnets = await Comments.findOne({ _id: newComments._id }).populate(
      "userId"
    );
    res.status(200).json({
      status: "success",
      message: "comments created successfully",
      data: commnets,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllcomments = async (req, res, next) => {
  try {
    const getComments = await Comments.find({ postId: req.params.postId })
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      message: "fetch all commenmts",
      data: getComments,
    });
  } catch (err) {
    next(err);
  }
};
exports.editComment = async (req, res, next) => {
  try {
    const findComments = await Comments.findOne({ _id: req.params.id });
    if (!findComments) {
      return next(new CustomError("no comments found ", 404));
    }
    if (!findComments.userId == req.id && !req.isAdmin) {
      return next(new CustomError("you cant not do that", 404));
    }
    const editedComment = await Comments.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    ).populate("userId");
    res.status(200).json({
      status: "success",
      message: "comment edited successfully",
      data: editedComment,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const findComment = await Comments.findOne({ _id: req.params.id });
    if (!findComment) {
      return next(new CustomError("No comment found", 404));
    }
    if (!findComment.userId == req.id && !req.admin) {
      return next(new CustomError("you cant not do that", 401));
    }
    const deletedComments = await Comments.findByIdAndDelete(req.params.id, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
      data: deletedComments,
    });
  } catch (err) {
    next(err);
  }
};
