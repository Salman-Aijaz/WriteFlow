const Article = require('../model/article_model');
const upload = require("../utils/muter_config");

const createPost = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const { user_id, title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const newArticle = await Article.createArticle(user_id, title, content, image);
      res.status(201).json({
        message: 'Article created successfully',
        article: newArticle
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating article' });
    }
  });
};

module.exports = {
  createPost
};
