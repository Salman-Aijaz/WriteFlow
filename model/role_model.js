const { Pool } = require('pg'); // Import PostgreSQL client
require('dotenv').config(); // Load environment variables

// Create a connection pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to fetch all roles
const getAllRoles = async () => {
  const query = 'SELECT id, role_name FROM roles'; // Replace `roles` with your table name
  const result = await pool.query(query);
  return result.rows; // Return the rows
};

module.exports = { getAllRoles };
