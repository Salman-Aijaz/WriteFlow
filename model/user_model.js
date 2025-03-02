const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Function to register a new user
const registerUser = async (name, email, password, role_id) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds
      const query = `INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING name`;
      const values = [name, email, hashedPassword, role_id];
  
      const result = await pool.query(query, values);
      return result.rows[0]; // Return user name
    } catch (error) {
      console.error('Error registering user:', error.message);
      throw error;
    }
  };
  
const findUserByEmail = async (email) => {
    try {
      const query = `SELECT id, name, email, password, role_id FROM users WHERE email = $1`;
      const result = await pool.query(query, [email]);
      return result.rows[0]; // Return the user if found
    } catch (error) {
      console.error('Error finding user:', error.message);
      throw error;
    }
};

const updateUserPassword = async (email, newPassword) => {
  try {
    const query = `UPDATE users SET password = $1 WHERE email = $2`;
    await pool.query(query, [newPassword, email]);
  } catch (error) {
    console.error("Error updating password:", error.message);
    throw error;
  }
};

const getUserById = async (user_id) => {
  try {
    const result = await pool.query("SELECT name FROM users WHERE id = $1", [user_id]);
    
    if (result.rows.length === 0) {
      return null; // No user found
    }

    return result.rows[0]; // Return the user object
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};


module.exports = { registerUser,findUserByEmail,updateUserPassword,getUserById };
  