// server/controllers/authController.js
const authService = require('../services/authService');

exports.registerUser = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};