const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller');
const { checkRole } = require("../middleware/authMiddleware");

// Route to create a new article post
router.post('/create',checkRole([1]), articleController.createPost);
router.get('/:article_id', articleController.getArticle);

// Route to update an article
router.put('/update-article/:article_id', checkRole([1]),articleController.updateArticle);

// Route to delete an article
router.delete('/delete-article/:article_id', checkRole([1]),articleController.deleteArticle);

module.exports = router;
