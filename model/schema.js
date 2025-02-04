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

const createLikeTable = async () => {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS likes (
     like_id SERIAL PRIMARY KEY,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             user_id INT REFERENCES users(id) ON DELETE CASCADE,
                 article_id INT REFERENCES articles(article_id) ON DELETE CASCADE
                 )
    `;

    await pool.query(query);
    console.log("Like table created successfully.");
  } catch (error) {
    console.error("Error creating Like table:", error.message);
    throw error;
  }
};

const createShareTable = async () => {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS shares (
     share_id SERIAL PRIMARY KEY,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             user_id INT REFERENCES users(id) ON DELETE CASCADE,
                 article_id INT REFERENCES articles(article_id) ON DELETE CASCADE
                 )
    `;

    await pool.query(query);
    console.log("Like table created successfully.");
  } catch (error) {
    console.error("Error creating Like table:", error.message);
    throw error;
  }
};

const createSaveTable = async () => {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS likes (
     save_id SERIAL PRIMARY KEY,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             user_id INT REFERENCES users(id) ON DELETE CASCADE,
                 article_id INT REFERENCES articles(article_id) ON DELETE CASCADE
                 )
    `;

    await pool.query(query);
    console.log("Like table created successfully.");
  } catch (error) {
    console.error("Error creating Like table:", error.message);
    throw error;
  }
};


// Execute the function
createArticleTable();
createLikeTable();
createSaveTable();
createShareTable();
module.exports = { createArticleTable, createLikeTable,createSaveTable,createShareTable };
