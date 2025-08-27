const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock database - in production, this would be a real database
let businesses = [
  {
    id: 1,
    name: "Liberia Tech Solutions",
    description: "Leading technology consulting and software development company serving businesses across Liberia with innovative digital solutions.",
    category: "Technology",
    location: "Monrovia",
    address: "123 Broad Street, Monrovia, Liberia",
    phone: "+231 123 456 789",
    email: "info@liberiatechsolutions.com",
    website: "https://liberiatechsolutions.com",
    rating: 4.8,
    reviewCount: 24,
    logo: null,
    images: [],
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    services: [
      "Web Development",
      "Mobile App Development",
      "Software Consulting",
      "Digital Transformation",
      "IT Infrastructure",
      "Cloud Solutions"
    ],
    coordinates: {
      lat: 6.3004,
      lng: -10.7969
    },
    status: "approved",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  }
];

// Validation middleware
const businessValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Business name must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('email').isEmail().withMessage('Valid email is required')
];

// GET /api/businesses - Get all businesses with filtering
router.get('/', (req, res) => {
  try {
    const { search, category, location, page = 1, limit = 12 } = req.query;
    
    let filteredBusinesses = [...businesses];
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.name.toLowerCase().includes(searchLower) ||
        business.description.toLowerCase().includes(searchLower) ||
        business.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (category) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.category === category
      );
    }
    
    // Filter by location
    if (location) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.location === location
      );
    }
    
    // Filter only approved businesses for public access
    filteredBusinesses = filteredBusinesses.filter(business => business.status === 'approved');
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedBusinesses = filteredBusinesses.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedBusinesses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredBusinesses.length / limit),
        totalItems: filteredBusinesses.length,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch businesses',
      message: error.message
    });
  }
});

// GET /api/businesses/:id - Get business by ID
router.get('/:id', (req, res) => {
  try {
    const business = businesses.find(b => b.id === parseInt(req.params.id));
    
    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }
    
    // Only return approved businesses for public access
    if (business.status !== 'approved') {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }
    
    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch business',
      message: error.message
    });
  }
});

// POST /api/businesses - Create new business listing
router.post('/', businessValidation, (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    
    const newBusiness = {
      id: businesses.length + 1,
      ...req.body,
      rating: 0,
      reviewCount: 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    businesses.push(newBusiness);
    
    res.status(201).json({
      success: true,
      message: 'Business listing submitted successfully and pending approval',
      data: {
        id: newBusiness.id,
        name: newBusiness.name,
        status: newBusiness.status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create business listing',
      message: error.message
    });
  }
});

// PUT /api/businesses/:id - Update business
router.put('/:id', businessValidation, (req, res) => {
  try {
    const businessIndex = businesses.findIndex(b => b.id === parseInt(req.params.id));
    
    if (businessIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    
    businesses[businessIndex] = {
      ...businesses[businessIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Business updated successfully',
      data: businesses[businessIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update business',
      message: error.message
    });
  }
});

// DELETE /api/businesses/:id - Delete business
router.delete('/:id', (req, res) => {
  try {
    const businessIndex = businesses.findIndex(b => b.id === parseInt(req.params.id));
    
    if (businessIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }
    
    businesses.splice(businessIndex, 1);
    
    res.json({
      success: true,
      message: 'Business deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete business',
      message: error.message
    });
  }
});

// GET /api/businesses/categories - Get all categories
router.get('/categories', (req, res) => {
  try {
    const categories = [...new Set(businesses.map(b => b.category))].sort();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
});

// GET /api/businesses/locations - Get all locations
router.get('/locations', (req, res) => {
  try {
    const locations = [...new Set(businesses.map(b => b.location))].sort();
    
    res.json({
      success: true,
      data: locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch locations',
      message: error.message
    });
  }
});

module.exports = router;
