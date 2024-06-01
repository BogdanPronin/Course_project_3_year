const formRepository = require('../repositories/formRepository');

exports.submitForm = async (formData) => {
    const form = await formRepository.submitForm(formData);
    return { message: 'Form submitted successfully', form };
};
