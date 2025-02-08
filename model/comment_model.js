const pool = require("../config/db");

const createComment = async (user_id, article_id, comment) => {
  const query =
    "INSERT INTO comments (user_id, article_id, comment) VALUES ($1, $2, $3) RETURNING *;";
  const values = [user_id, article_id, comment];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the created comment
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createComment };
