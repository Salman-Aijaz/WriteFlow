const { body } = require("express-validator");

// Validation rules for registration
const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),
  body("role_id").notEmpty().withMessage("Role ID is required"),
];

// Validation rules for login
const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validation rules for forgot password
const validateForgotPassword = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("new_password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),
  body("confirm_password")
    .custom((value, { req }) => value === req.body.new_password)
    .withMessage("Passwords do not match"),
];

// Validation rules for refresh token
const validateRefreshToken = [
  body("token").notEmpty().withMessage("Token is required"),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateRefreshToken,
};
