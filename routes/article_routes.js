const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller');

// Route to create a new article post
router.post('/create', articleController.createPost);

module.exports = router;
