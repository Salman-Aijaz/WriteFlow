const express = require('express');
const { getRoles } = require('../controllers/role_controller');
const router = express.Router();

// Define route to get all roles
router.get('/roles', getRoles);

// Add your routes here
router.get('/', (req, res) => {
    res.json({ message: 'Role routes working!' });
});

module.exports = router;
    