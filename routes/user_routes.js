const express = require("express");
const {
  register,
  login,
  forgotPassword,
  refreshToken,
} = require("../controllers/user_controller");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateRefreshToken,
} = require("../utils/validationUtils");
const validationMiddleware = require("../middleware/validationMiddleware")

const router = express.Router();

// Register User
router.post("/register",validateRegister,validationMiddleware, register);
router.post("/login",validateLogin,validationMiddleware, login);
router.post("/forgot-password", validateForgotPassword,validationMiddleware, forgotPassword);
router.post("/refresh-token", validateRefreshToken,validationMiddleware, refreshToken);

module.exports = router;
