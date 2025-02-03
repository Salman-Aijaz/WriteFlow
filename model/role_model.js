const pool = require('../config/db');

// Create a connection pool using the DATABASE_URL

// Function to fetch all roles
const getAllRoles = async () => {
  const query = 'SELECT id, role_name FROM roles'; // Replace `roles` with your table name
  const result = await pool.query(query);
  return result.rows; // Return the rows
};

module.exports = { getAllRoles };
