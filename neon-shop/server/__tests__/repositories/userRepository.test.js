const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../../models/user');
const userRepository = require('../../repositories/userRepository');

describe('User Repository', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('createUser should create a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'hashedpassword'
    };

    const user = await userRepository.createUser(userData);
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.phone).toBe('1234567890');
  });

  test('findUserByEmailOrPhone should find a user by email or phone', async () => {
    const user = await userRepository.findUserByEmailOrPhone('test@example.com', '1234567890');
    expect(user).not.toBeNull();
    expect(user.email).toBe('test@example.com');
  });

  test('findUserByEmail should find a user by email', async () => {
    const user = await userRepository.findUserByEmail('test@example.com');
    expect(user).not.toBeNull();
    expect(user.email).toBe('test@example.com');
  });
});
