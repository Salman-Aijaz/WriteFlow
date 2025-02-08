const jwt = require("jsonwebtoken")
const pool = require("../config/db");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ success: false, message: "Access denied. No token provided." });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Store user info in the request for use in the route handlers
      next(); // Proceed to the next middleware/route
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
  

const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
      const user_id = req.body.user_id || req.user?.id; // Try both ways
      console.log("REQ BODY----->", req.body);

      if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
      }
      console.log("Checking role for user_id:", user_id);

  
      try {
        // Get the user role from the database
        const result = await pool.query(
          "SELECT role_id FROM users WHERE id = $1",
          [user_id]
        );
  
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "User not found" }); // ✅ Fix: Properly return 404
        }
  
        const userRole = result.rows[0].role_id;
  
        // Check if user role is allowed
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ message: "Access Denied" });
        }
  
        next(); // Proceed to the next middleware or controller
      } catch (error) {
        console.error("Error checking role:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  };
  

module.exports = {authMiddleware,checkRole};
  