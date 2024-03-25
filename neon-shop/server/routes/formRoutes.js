const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/submitFormController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/submit-form', upload.single('file'), submitForm);

module.exports = router;