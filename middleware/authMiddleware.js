const jwt = require("jsonwebtoken")

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
  
module.exports = authMiddleware;
  