const Comment = require("../model/comment_model");

const createComment = async (req, res) => {
  const { user_id, article_id, comment } = req.body;
  console.log("REQ----------->",req.body)

  try {
    const newComment = await Comment.createComment(
      user_id,
      article_id,
      comment
    );
    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
    console.log("Error--->",error)
  }
};

const getCommentById = async (req, res) => {
  const { comment_id } = req.params;
  console.log("Fetching Comment ID---->", comment_id);

  try {
    const comment = await Comment.getCommentById(comment_id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comment" });
    console.log("Error--->", error);
  }
};


const updateComment = async (req, res) => {
  const { comment_id, comment } = req.body;
  console.log("Updating Comment---->", req.body);

  try {
    const updatedComment = await Comment.updateComment(comment_id, comment);
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
    console.log("Error--->", error);
  }
};

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  console.log("Deleting Comment ID---->", comment_id);

  try {
    const deletedComment = await Comment.deleteComment(comment_id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({
      message: "Comment deleted successfully",
      comment: deletedComment,
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
    console.log("Error--->", error);
  }
};


module.exports = { createComment,getCommentById, updateComment,deleteComment };
