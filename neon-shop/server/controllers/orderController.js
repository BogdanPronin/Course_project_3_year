const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : null;
        const { items, totalPrice } = req.body;

        if (!userId) {
            console.log('User ID is missing'); 
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const orderData = {
            userId,
            items,
            totalPrice
        };

        const result = await orderService.createOrder(orderData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating order:', error); 
        res.status(500).json({ error: error.message });
    }
};
