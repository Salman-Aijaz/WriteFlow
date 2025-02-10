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

const getCommentById = async (comment_id) => {
  const query = `
    SELECT 
    c.comment_id, 
    c.created_at, 
    c.user_id, 
    c.article_id, 
    c.comment,
    COALESCE(
        json_agg(
            json_build_object(
                'reply_id', COALESCE(r.reply_id, 0),
                'reply', COALESCE(r.reply, '')
            )
        ) FILTER (WHERE r.reply_id IS NOT NULL), '[]'
    ) AS reply
FROM comments c
LEFT JOIN reply r ON c.comment_id = r.comment_id
WHERE c.comment_id = $1
GROUP BY c.comment_id;
  `;

  try {
    const result = await pool.query(query, [comment_id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateComment = async (comment_id, comment) => {
  const query = `
    UPDATE comments 
    SET comment = $1
    WHERE comment_id = $2
    RETURNING *;
  `;
  const values = [comment, comment_id];

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

const deleteComment = async (comment_id) => {
  const query = `
    DELETE FROM comments WHERE comment_id = $1 RETURNING *;
  `;

  try {
    const result = await pool.query(query, [comment_id]);
    return result.rows.length > 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
};
