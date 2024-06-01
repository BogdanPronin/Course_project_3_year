const request = require('supertest');
const express = require('express');
const authRoutes = require('../../routes/authRoutes');
const authService = require('../../services/authService');

jest.mock('../../services/authService');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Controller', () => {
  test('POST /register should register a user', async () => {
    authService.register.mockResolvedValue({
      message: 'User registered',
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        phone: '1234567890'
      }
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'password'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered');
    expect(response.body.user).toHaveProperty('id');
  });

  test('POST /register should return an error if user already exists', async () => {
    authService.register.mockRejectedValue(new Error('User with this email or phone already exists.'));

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        phone: '1234567890',
        password: 'password'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User with this email or phone already exists.');
  });
});
