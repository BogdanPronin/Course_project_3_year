const express = require('express');
const formController = require('../controllers/submitFormController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/submit-form', upload.single('file'), formController.submitForm);

module.exports = router;
