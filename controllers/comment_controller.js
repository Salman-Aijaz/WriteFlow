const Comment = require("../model/comment_model");
const pusher = require("../config/pusher");
const User = require("../model/user_model"); // Import the User model to fetch username


const createComment = async (req, res) => {
  const { user_id, article_id, comment } = req.body;
  console.log("REQ----------->", req.body);

  try {
    // Fetch username from users table
    const userResult = await User.getUserById(user_id);
    if (!userResult) {
      return res.status(404).json({ error: "User not found" });
    }
    const username = userResult.username; // Extract username

    // Insert the comment into the database
    const newComment = await Comment.createComment(user_id, article_id, comment);

    // Send notification using Pusher
    pusher.trigger("comments", "new_comment", {
      message: `${username} posted a new comment`,
      user_id,
      article_id,
      comment: newComment.comment,
      username, // Include username in the notification
    }).then(() => {
      console.log("✅ Pusher event sent successfully!");
    }).catch((error) => {
      console.error("❌ Error sending Pusher event:", error);
    });
    
    res.status(201).json({
      message: "Comment created successfully",
      comment: { ...newComment, username },
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
    console.log("Error--->", error);
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
