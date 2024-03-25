const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();


router.post('/orders', authenticateToken, createOrder);

module.exports = router;