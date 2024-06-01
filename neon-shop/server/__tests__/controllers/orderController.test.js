const request = require('supertest');
const express = require('express');
const orderRoutes = require('../../routes/orderRoutes');
const orderService = require('../../services/orderService');
const authenticateToken = require('../../middleware/authenticateToken');

jest.mock('../../services/orderService');
jest.mock('../../middleware/authenticateToken', () => jest.fn((req, res, next) => {
  req.user = { userId: 1 };
  next();
}));

const app = express();
app.use(express.json());
app.use('/api/orders/', orderRoutes);

describe('Order Controller', () => {
  test('POST /api/orders/orders should create an order', async () => {
    orderService.createOrder.mockResolvedValue({
      message: 'Order created',
      order: {
        id: 1,
        userId: 1,
        items: [{ item: 'test item', quantity: 1 }],
        totalPrice: 100
      }
    });

    const response = await request(app)
      .post('/api/orders/orders')
      .send({
        items: [{ item: 'test item', quantity: 1 }],
        totalPrice: 100
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Order created');
    expect(response.body.order).toHaveProperty('id');
  });

  test('POST /api/orders/orders should return an error if user ID is missing', async () => {
    authenticateToken.mockImplementationOnce((req, res, next) => {
      req.user = null;
      next();
    });

    const response = await request(app)
      .post('/api/orders/orders')
      .send({
        items: [{ item: 'test item', quantity: 1 }],
        totalPrice: 100
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User ID is missing');
  });
});
