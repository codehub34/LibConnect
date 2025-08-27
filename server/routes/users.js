const express = require('express');
const router = express.Router();

// Mock users data
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    role: "business_owner",
    joinDate: "2024-01-10",
    status: "active",
    businesses: 2
  }
];

// GET /api/users - Get all users (admin only)
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

module.exports = router;
