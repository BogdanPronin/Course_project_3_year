// server/repositories/userRepository.js
const User = require('../models/user');
const { Sequelize } = require('sequelize');

exports.createUser = async (userData) => {
    console.log('Creating user in database with data:', userData);
    try {
        // Проверка полей данных
        if (!userData.username || !userData.email || !userData.phone || !userData.password) {
            throw new Error('Missing required fields');
        }
        const user = await User.create(userData);
        console.log('User created successfully:', user);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


exports.findUserByEmailOrPhone = async (email, phone) => {
    return await User.findOne({ where: { [Sequelize.Op.or]: [{ email }, { phone }] } });
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};
