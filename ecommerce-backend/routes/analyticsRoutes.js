const express = require('express');
const router = express.Router();
const {
    getProductRecommendations,
    getSalesAnalytics,
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/recommendations/:userId', protect, getProductRecommendations);
router.get('/sales', protect, admin, getSalesAnalytics);

module.exports = router;
