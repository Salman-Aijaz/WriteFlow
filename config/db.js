// dbConfig.js
const { Pool } = require('pg'); // Import PostgreSQL client
require('dotenv').config(); // Load environment variables

// Create a connection pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
