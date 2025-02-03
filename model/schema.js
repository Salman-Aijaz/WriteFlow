const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createArticleTable = async () => {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS articles (
    article_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                    image VARCHAR(255),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                            )
    `;

    await pool.query(query);
    console.log("Articles table created successfully.");
  } catch (error) {
    console.error("Error creating articles table:", error.message);
    throw error;
  }
};

// Execute the function
createArticleTable();

module.exports = { createArticleTable };
