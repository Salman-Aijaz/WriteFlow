const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller');

// Route to create a new article post
router.post('/create', articleController.createPost);
router.get('/:article_id', articleController.getArticle);

// Route to update an article
router.put('/update-article/:article_id', articleController.updateArticle);

// Route to delete an article
router.delete('/delete-article/:article_id', articleController.deleteArticle);

module.exports = router;
