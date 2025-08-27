const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Validation middleware
const contactValidation = [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 20, max: 1000 }).withMessage('Message must be between 20 and 1000 characters')
];

// Mock storage for contact submissions
let contactSubmissions = [];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, (req, res) => {
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

    const { firstName, lastName, email, subject, message } = req.body;

    // Create contact submission
    const contactSubmission = {
      id: contactSubmissions.length + 1,
      firstName,
      lastName,
      email,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Store submission
    contactSubmissions.push(contactSubmission);

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Log the submission

    // Simulate email sending
    console.log('📧 Contact form submission received:');
    console.log(`   From: ${firstName} ${lastName} (${email})`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Message: ${message}`);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        id: contactSubmission.id,
        submittedAt: contactSubmission.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form',
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', (req, res) => {
  try {
    // In production, you would check admin authentication here
    const { page = 1, limit = 20, status } = req.query;
    
    let filteredSubmissions = [...contactSubmissions];
    
    // Filter by status if provided
    if (status) {
      filteredSubmissions = filteredSubmissions.filter(submission => submission.status === status);
    }
    
    // Sort by newest first
    filteredSubmissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedSubmissions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredSubmissions.length / limit),
        totalItems: filteredSubmissions.length,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get contact submissions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions',
      message: error.message
    });
  }
});

// GET /api/contact/:id - Get specific contact submission (admin only)
router.get('/:id', (req, res) => {
  try {
    const submission = contactSubmissions.find(s => s.id === parseInt(req.params.id));
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }
    
    res.json({
      success: true,
      data: submission
    });

  } catch (error) {
    console.error('Get contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submission',
      message: error.message
    });
  }
});

// PUT /api/contact/:id/status - Update contact submission status (admin only)
router.put('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'in-progress', 'resolved', 'closed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
        message: 'Status must be one of: new, in-progress, resolved, closed'
      });
    }
    
    const submissionIndex = contactSubmissions.findIndex(s => s.id === parseInt(req.params.id));
    
    if (submissionIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }
    
    contactSubmissions[submissionIndex].status = status;
    contactSubmissions[submissionIndex].updatedAt = new Date().toISOString();
    
    // In production, you would:
    // 1. Update database
    // 2. Send notification to user if status changed
    // 3. Log the status change
    
    res.json({
      success: true,
      message: 'Contact submission status updated successfully',
      data: {
        id: contactSubmissions[submissionIndex].id,
        status: contactSubmissions[submissionIndex].status,
        updatedAt: contactSubmissions[submissionIndex].updatedAt
      }
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact submission status',
      message: error.message
    });
  }
});

// DELETE /api/contact/:id - Delete contact submission (admin only)
router.delete('/:id', (req, res) => {
  try {
    const submissionIndex = contactSubmissions.findIndex(s => s.id === parseInt(req.params.id));
    
    if (submissionIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }
    
    const deletedSubmission = contactSubmissions.splice(submissionIndex, 1)[0];
    
    // In production, you would:
    // 1. Soft delete from database
    // 2. Log the deletion
    // 3. Archive the submission
    
    res.json({
      success: true,
      message: 'Contact submission deleted successfully',
      data: {
        id: deletedSubmission.id,
        deletedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Delete contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact submission',
      message: error.message
    });
  }
});

// GET /api/contact/stats/summary - Get contact form statistics (admin only)
router.get('/stats/summary', (req, res) => {
  try {
    const totalSubmissions = contactSubmissions.length;
    const newSubmissions = contactSubmissions.filter(s => s.status === 'new').length;
    const inProgressSubmissions = contactSubmissions.filter(s => s.status === 'in-progress').length;
    const resolvedSubmissions = contactSubmissions.filter(s => s.status === 'resolved').length;
    const closedSubmissions = contactSubmissions.filter(s => s.status === 'closed').length;
    
    // Get submissions by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSubmissions = contactSubmissions.filter(s => 
      new Date(s.createdAt) >= thirtyDaysAgo
    ).length;
    
    res.json({
      success: true,
      data: {
        total: totalSubmissions,
        byStatus: {
          new: newSubmissions,
          inProgress: inProgressSubmissions,
          resolved: resolvedSubmissions,
          closed: closedSubmissions
        },
        recent: {
          last30Days: recentSubmissions
        }
      }
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact statistics',
      message: error.message
    });
  }
});

module.exports = router;
