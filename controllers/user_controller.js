const {registerUser, findUserByEmail, updateUserPassword,} = require("../model/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    // Register user
    const user = await registerUser(name, email, password, role_id);

    res.status(201).json({
      success: true,
      message: `User ${user.name} is successfully registered`,
    });
  } catch (error) {
    if (error.code === "23505") {
      // PostgreSQL unique violation error
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { role_id: user.role_id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "1h" } // Token expiration
    );

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, new_password, confirm_password } = req.body;

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password in the database
    await updateUserPassword(email, hashedPassword);

    res.status(200).json({
      success: true,
      message: "Password has been successfully reset",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error resetting password" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid or expired token" });
      }

      // Create a new token with refreshed expiration time
      const newToken = jwt.sign(
        { role_id: decoded.role_id, email: decoded.email }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // New expiry time
      );

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        token: newToken,
      });
    });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    res.status(500).json({ success: false, message: "Error refreshing token" });
  }
};

module.exports = { register, login, forgotPassword, refreshToken };
