const formService = require('../services/formService');

exports.submitForm = async (req, res) => {
    try {
        const formData = { ...req.body, filePath: req.file ? req.file.path : '' };
        const result = await formService.submitForm(formData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
