const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


const authenticateToken = require('../middleware/authenticateToken');

// router.get('/api/protected', authenticateToken, (req, res) => {
//   res.json({ message: "Доступно только аутентифицированным пользователям" });
// });

module.exports = router;
