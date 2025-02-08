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

module.exports = { createComment };
