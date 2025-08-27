const express = require('express');
const router = express.Router();

// Mock reviews data
let reviews = [
  {
    id: 1,
    businessId: 1,
    author: "John Doe",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent service! The team at Liberia Tech Solutions delivered our website ahead of schedule and exceeded our expectations. Highly recommended!"
  }
];

// GET /api/reviews - Get reviews for a business
router.get('/', (req, res) => {
  try {
    const { businessId } = req.query;
    
    if (businessId) {
      const businessReviews = reviews.filter(review => review.businessId === parseInt(businessId));
      return res.json({
        success: true,
        data: businessReviews
      });
    }
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
      message: error.message
    });
  }
});

module.exports = router;
