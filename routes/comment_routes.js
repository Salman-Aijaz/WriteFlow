const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment_controller');

router.post('/create', commentController.createComment);
router.get("/:comment_id", commentController.getCommentById);
router.put("/update", commentController.updateComment);
router.delete("/delete/:comment_id", commentController.deleteComment);
module.exports = router;
