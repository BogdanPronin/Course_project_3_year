const pool = require('../db/index');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const submitForm = async (req, res) => {
  const { name, email, phone, comment } = req.body;
  const filePath = req.file ? req.file.path : '';

  try {
    await pool.query('INSERT INTO submissions (name, email, phone, comment, file_path) VALUES ($1, $2, $3, $4, $5)', [name, email, phone, comment, filePath]);
    res.json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit the form' });
  }
};

module.exports = { submitForm };
