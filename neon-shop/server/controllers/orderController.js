const pool = require('../db/index');

const createOrder = async (req, res) => {
    try {
      const { items, totalPrice } = req.body;
      const userId = req.user.id;

      // Пример запроса для создания заказа
      console.log([userId, JSON.stringify(items), totalPrice]);
      const result = await pool.query(
        'INSERT INTO orders (user_id, items, total_price) VALUES ($1, $2, $3) RETURNING *',
        [userId, JSON.stringify(items), totalPrice]
      );
  
      res.status(201).json({ message: 'Заказ успешно создан', order: result.rows[0] });
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      res.status(500).send('Ошибка сервера при создании заказа');
    }
  };
  
  module.exports = {
    createOrder,
  };