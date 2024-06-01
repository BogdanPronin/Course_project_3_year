const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const Order = require('../../models/order');
const orderRepository = require('../../repositories/orderRepository');

describe('Order Repository', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('createOrder should create a new order', async () => {
    const orderData = {
      userId: 1,
      items: [{ item: 'test item', quantity: 1 }],
      totalPrice: 100
    };

    const order = await orderRepository.createOrder(orderData);
    expect(order).toHaveProperty('id');
    expect(order.userId).toBe(1);
    expect(order.items).toEqual([{ item: 'test item', quantity: 1 }]);
    expect(order.totalPrice).toBe(100);
  });

  test('findOrderById should find an order by ID', async () => {
    const order = await orderRepository.createOrder({
      userId: 1,
      items: [{ item: 'test item', quantity: 1 }],
      totalPrice: 100
    });

    const foundOrder = await orderRepository.findOrderById(order.id);
    expect(foundOrder).not.toBeNull();
    expect(foundOrder.id).toBe(order.id);
  });
});
