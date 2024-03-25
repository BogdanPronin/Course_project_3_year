require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const authRoutes = require('./routes/authRoutes'); // Убедитесь, что путь к файлу правильный
const formRoutes = require('./routes/formRoutes'); // Убедитесь, что путь к файлу правильный
const orderRoutes = require('./routes/orderRoutes'); // Убедитесь, что путь к файлу правильный
const app = express();
const port = process.env.PORT || 3001; // Измените порт на 5000
app.listen(port, () => console.log(`Server running on port ${port}`));

// Настройка пула подключений к PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Использование CORS
app.use(cors());

app.use(express.json());

// Подключение маршрутов аутентификации
app.use('/api/auth', authRoutes);


app.use('/api', formRoutes);

app.use('/api/orders', orderRoutes);