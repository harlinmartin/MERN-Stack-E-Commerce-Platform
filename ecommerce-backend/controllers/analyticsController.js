const Product = require('../models/product');

// @desc    Get product recommendations (Mock AI Recommendation Engine)
// @route   GET /api/analytics/recommendations/:userId
// @access  Private
exports.getProductRecommendations = async (req, res) => {
    try {
        // Simple logic: return top 4 products as "recommendations"
        const recommendations = await Product.find({})
            .sort('-averageRating')
            .limit(4);

        res.json({
            source: 'AI Recommendation Engine',
            recommendations,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get sales analytics
// @route   GET /api/analytics/sales
// @access  Private/Admin
exports.getSalesAnalytics = async (req, res) => {
    try {
        const data = {
            monthlySales: [
                { month: 'Jan', sales: 4000 },
                { month: 'Feb', sales: 3000 },
                { month: 'Mar', sales: 5000 },
                { month: 'Apr', sales: 2780 },
                { month: 'May', sales: 1890 },
                { month: 'Jun', sales: 2390 },
            ],
            topCategories: [
                { name: 'Electronics', value: 400 },
                { name: 'Clothing', value: 300 },
                { name: 'Home', value: 300 },
                { name: 'Books', value: 200 },
            ]
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
