const Form = require('../models/form');

exports.submitForm = async (formData) => {
    return await Form.create(formData);
};

exports.findFormById = async (id) => {
    return await Form.findByPk(id);
};
