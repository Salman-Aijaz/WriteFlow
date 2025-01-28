const { getAllRoles } = require('../model/role_model');

// Controller to handle GET request for roles
const getRoles = async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch roles' });
  }
};

module.exports = { getRoles };
