const orderRepository = require('../repositories/orderRepository');

exports.createOrder = async (orderData) => {
    const order = await orderRepository.createOrder(orderData);
    return { message: 'Order created successfully', order };
};
