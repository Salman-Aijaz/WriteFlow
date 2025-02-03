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

module.exports = {
  createArticle,
};
