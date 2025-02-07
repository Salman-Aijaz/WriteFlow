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

const getArticle = async (req, res) => {
  const { article_id } = req.params;

  try {
    const article = await Article.getArticleById(article_id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({
      message: "Article",
      article: {
        article_id: article.article_id,
        user_id: article.user_id,
        title: article.title,
        content: article.content,
        image: article.image,
        created_at: article.created_at,
        updated_at: article.updated_at,
        likes: {
          total_likes: article.total_likes
        },
        share: {
          total_shares: article.total_shares
        },
        save: {
          total_save: article.total_save
        }
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Error fetching article" });
    console.log("ERROR--------------->", error);
  }
};

// Update Article
const updateArticle = async (req, res) => {
  const { article_id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedArticle = await Article.updateArticle(article_id, title, content);
    
    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle
    });

  } catch (error) {
    res.status(500).json({ error: "Error updating article" });
    console.log("ERROR-------->", error);
  }
};

// Delete Article
const deleteArticle = async (req, res) => {
  const { article_id } = req.params;

  try {
    const deleted = await Article.deleteArticle(article_id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Error deleting article" });
  }
};

module.exports = {
  createPost,
  getArticle,
  updateArticle,
  deleteArticle
};
