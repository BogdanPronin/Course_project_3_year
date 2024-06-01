const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', authenticateToken, orderController.createOrder);

module.exports = router;
