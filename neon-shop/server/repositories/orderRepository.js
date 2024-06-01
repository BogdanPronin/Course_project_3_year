const Order = require('../models/order');

exports.createOrder = async (orderData) => {
    return await Order.create(orderData);
};

exports.findOrderById = async (id) => {
    return await Order.findByPk(id);
};

exports.findOrdersByUserId = async (userId) => {
    return await Order.findAll({ where: { userId } });
};
