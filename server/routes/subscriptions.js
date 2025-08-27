const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting for payment endpoints
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many payment attempts, please try again later.'
});

// Mock data for subscriptions and transactions
let subscriptions = [
  {
    id: 1,
    userId: 1,
    tier: 'basic',
    status: 'trial',
    trialStartDate: '2024-01-01',
    trialEndDate: '2024-02-01',
    currentPeriodStart: '2024-01-01',
    currentPeriodEnd: '2024-02-01',
    cancelAtPeriodEnd: false,
    stripeCustomerId: 'cus_mock_1',
    stripeSubscriptionId: 'sub_mock_1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

let transactions = [
  {
    id: 1,
    userId: 1,
    subscriptionId: 1,
    amount: 625, // $6.25 in cents
    currency: 'usd',
    status: 'succeeded',
    paymentMethod: 'stripe',
    stripePaymentIntentId: 'pi_mock_1',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// GET /api/subscriptions - Get user's subscription (protected)
router.get('/', (req, res) => {
  try {
    // In production, this would check JWT token and get userId
    const userId = req.query.userId || 1; // Mock userId for now
    
    const userSubscription = subscriptions.find(sub => sub.userId === parseInt(userId));
    
    if (!userSubscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    res.json({
      success: true,
      data: userSubscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription',
      message: error.message
    });
  }
});

// POST /api/subscriptions/create-checkout-session - Create Stripe checkout session
router.post('/create-checkout-session', paymentLimiter, [
  body('priceId').notEmpty().withMessage('Price ID is required'),
  body('successUrl').isURL().withMessage('Success URL must be valid'),
  body('cancelUrl').isURL().withMessage('Cancel URL must be valid')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { priceId, successUrl, cancelUrl, userId } = req.body;
    
    // In production, this would integrate with Stripe
    // For now, we'll mock the response
    const mockCheckoutSession = {
      id: 'cs_mock_' + Date.now(),
      url: `${successUrl}?session_id=cs_mock_${Date.now()}`,
      priceId,
      userId
    };
    
    res.json({
      success: true,
      data: mockCheckoutSession
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session',
      message: error.message
    });
  }
});

// POST /api/subscriptions/webhook - Handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    // In production, this would verify Stripe webhook signature
    const event = req.body;
    
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful checkout
        console.log('Checkout completed:', event.data.object);
        break;
      case 'invoice.payment_succeeded':
        // Handle successful payment
        console.log('Payment succeeded:', event.data.object);
        break;
      case 'customer.subscription.updated':
        // Handle subscription updates
        console.log('Subscription updated:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        console.log('Subscription cancelled:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Webhook error',
      message: error.message
    });
  }
});

// POST /api/subscriptions/cancel - Cancel subscription
router.post('/cancel', paymentLimiter, (req, res) => {
  try {
    const { subscriptionId, userId } = req.body;
    
    const subscription = subscriptions.find(sub => 
      sub.id === parseInt(subscriptionId) && sub.userId === parseInt(userId)
    );
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    subscription.cancelAtPeriodEnd = true;
    subscription.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Subscription will be cancelled at the end of the current period',
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription',
      message: error.message
    });
  }
});

// POST /api/subscriptions/reactivate - Reactivate cancelled subscription
router.post('/reactivate', paymentLimiter, (req, res) => {
  try {
    const { subscriptionId, userId } = req.body;
    
    const subscription = subscriptions.find(sub => 
      sub.id === parseInt(subscriptionId) && sub.userId === parseInt(userId)
    );
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    subscription.cancelAtPeriodEnd = false;
    subscription.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Subscription reactivated',
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to reactivate subscription',
      message: error.message
    });
  }
});

// GET /api/subscriptions/transactions - Get user's transaction history
router.get('/transactions', (req, res) => {
  try {
    const userId = req.query.userId || 1; // Mock userId for now
    
    const userTransactions = transactions.filter(tx => tx.userId === parseInt(userId));
    
    res.json({
      success: true,
      data: userTransactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions',
      message: error.message
    });
  }
});

// POST /api/subscriptions/upgrade - Upgrade subscription tier
router.post('/upgrade', paymentLimiter, [
  body('newTier').isIn(['standard', 'premium']).withMessage('Invalid tier'),
  body('userId').notEmpty().withMessage('User ID is required')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { newTier, userId } = req.body;
    
    let subscription = subscriptions.find(sub => sub.userId === parseInt(userId));
    
    if (!subscription) {
      // Create new subscription for new user
      subscription = {
        id: subscriptions.length + 1,
        userId: parseInt(userId),
        tier: newTier,
        status: 'trial',
        trialStartDate: new Date().toISOString().split('T')[0],
        trialEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        currentPeriodStart: new Date().toISOString().split('T')[0],
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        cancelAtPeriodEnd: false,
        stripeCustomerId: 'cus_mock_' + Date.now(),
        stripeSubscriptionId: 'sub_mock_' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      subscriptions.push(subscription);
    } else {
      // Update existing subscription
      subscription.tier = newTier;
      subscription.updatedAt = new Date().toISOString();
    }
    
    res.json({
      success: true,
      message: `Subscription upgraded to ${newTier}`,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to upgrade subscription',
      message: error.message
    });
  }
});

// GET /api/subscriptions/trial-status - Check trial status
router.get('/trial-status', (req, res) => {
  try {
    const userId = req.query.userId || 1; // Mock userId for now
    
    const subscription = subscriptions.find(sub => sub.userId === parseInt(userId));
    
    if (!subscription) {
      return res.json({
        success: true,
        data: {
          hasTrial: false,
          daysRemaining: 0,
          isExpired: false
        }
      });
    }
    
    const now = new Date();
    const trialEnd = new Date(subscription.trialEndDate);
    const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
    
    res.json({
      success: true,
      data: {
        hasTrial: subscription.status === 'trial',
        daysRemaining: Math.max(0, daysRemaining),
        isExpired: daysRemaining <= 0,
        trialEndDate: subscription.trialEndDate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check trial status',
      message: error.message
    });
  }
});

module.exports = router;
