const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('../db/index');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    const { username, email, phone, password } = req.body;

    // Валидация
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
    if (!username || !email || !phone || !password) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Invalid phone format.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    try {
        // Проверка на уникальность email и phone
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR phone = $2',
            [email, phone]
        );

        if (existingUser.rows.length > 0) {
            // Здесь можно уточнить, какое именно поле привело к ошибке, если это важно для клиента
            return res.status(400).json({ message: 'User with this email or phone already exists.' });
        }

        // Хеширование пароля и создание пользователя
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email, phone',
            [username, email, phone, hashedPassword]
        );

        // Возвращаем основные данные пользователя (без пароля)
        res.status(201).json({
            message: "User successfully registered",
            user: newUser.rows[0] // возвращает пользователя без пароля
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during user registration.');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) return res.status(400).send('User not found');
        console.log(process.env.JWT_SECRET); // Должно вывести ваш секретный ключ
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log(user.rows[0].id);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during user login.');
    }
};

