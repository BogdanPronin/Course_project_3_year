// server/services/authService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (data) => {
    const { username, email, phone, password } = data;
    console.log('Received data:', data);
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await userRepository.findUserByEmailOrPhone(email, phone);
    console.log('Received data:', existingUser);
    if (existingUser) {
        throw new Error('User with this email or phone already exists.');
    }
    console.log('Received data:', data);
    const user = await userRepository.createUser({ username, email, phone, password: hashedPassword });
    return { message: 'User registered', user };
};

exports.login = async (data) => {
    const { email, password } = data;
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { token };
};
