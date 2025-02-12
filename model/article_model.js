const pool = require('../config/db');

const createArticle = async (user_id, title, content, image) => {
  const query = `
      INSERT INTO articles (user_id, title, content, image, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *;
    `;
  const values = [user_id, title, content, image];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the created article
  } catch (error) {
    throw new Error(error);
  }
};

const getArticleById = async (article_id) => {
  const query = `
    SELECT 
      a.article_id, 
      a.user_id, 
      a.title, 
      a.content, 
      a.image, 
      a.created_at, 
      a.updated_at,
      COALESCE(l.total_likes, 0) AS total_likes,
      COALESCE(s.total_shares, 0) AS total_shares,
      COALESCE(sa.total_save, 0) AS total_save
    FROM articles a
    LEFT JOIN (
      SELECT article_id, COUNT(*) AS total_likes FROM likes GROUP BY article_id
    ) l ON a.article_id = l.article_id
    LEFT JOIN (
      SELECT article_id, COUNT(*) AS total_shares FROM shares GROUP BY article_id
    ) s ON a.article_id = s.article_id
    LEFT JOIN (
      SELECT article_id, COUNT(*) AS total_save FROM save GROUP BY article_id
    ) sa ON a.article_id = sa.article_id
    WHERE a.article_id = $1;
  `;

  try {
    const result = await pool.query(query, [article_id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateArticle = async (article_id, title, content) => {
  let query = `UPDATE articles SET `;
  let values = [];
  let count = 1;

  if (title) {
    query += `title = $${count}, `;
    values.push(title);
    count++;
  }

  if (content) {
    query += `content = $${count}, `;
    values.push(content);
    count++;
  }

  // Ensure at least one field is updated
  if (values.length === 0) {
    throw new Error("No valid fields to update");
  }

  query += `updated_at = NOW() WHERE article_id = $${count} RETURNING *;`;
  values.push(article_id);

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteArticle = async (article_id) => {
  const query = `
    DELETE FROM articles WHERE article_id = $1 RETURNING *;
  `;

  try {
    const result = await pool.query(query, [article_id]);
    return result.rows.length > 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle
};
