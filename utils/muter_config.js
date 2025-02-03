// utils/multerConfig.js
const multer = require('multer');
const path = require('path');

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a unique name
  }
});

// Multer setup to handle single image upload
const upload = multer({ storage: storage }).single('image'); // 'image' is the name field in the form

module.exports = upload;
