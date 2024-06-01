const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const Form = require('../../models/form');
const formRepository = require('../../repositories/formRepository');

describe('Form Repository', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('submitForm should create a new form', async () => {
    const formData = {
      name: 'test name',
      email: 'test@example.com',
      phone: '1234567890',
      comment: 'test comment',
      filePath: 'path/to/file'
    };

    const form = await formRepository.submitForm(formData);
    expect(form).toHaveProperty('id');
    expect(form.name).toBe('test name');
    expect(form.email).toBe('test@example.com');
    expect(form.phone).toBe('1234567890');
    expect(form.comment).toBe('test comment');
    expect(form.filePath).toBe('path/to/file');
  });

  test('findFormById should find a form by ID', async () => {
    const form = await formRepository.submitForm({
      name: 'test name',
      email: 'test@example.com',
      phone: '1234567890',
      comment: 'test comment',
      filePath: 'path/to/file'
    });

    const foundForm = await formRepository.findFormById(form.id);
    expect(foundForm).not.toBeNull();
    expect(foundForm.id).toBe(form.id);
  });
});
