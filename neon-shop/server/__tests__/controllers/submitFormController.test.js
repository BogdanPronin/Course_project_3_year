const request = require('supertest');
const express = require('express');
const formRoutes = require('../../routes/formRoutes');
const formService = require('../../services/formService');

jest.mock('../../services/formService');

const app = express();
app.use(express.json());
app.use('/api', formRoutes);

describe('Submit Form Controller', () => {
  test('POST /submit-form should submit a form', async () => {
    formService.submitForm.mockResolvedValue({
      message: 'Form submitted',
      form: {
        id: 1,
        name: 'test name',
        email: 'test@example.com',
        phone: '1234567890',
        comment: 'test comment',
        filePath: 'path/to/file'
      }
    });

    const response = await request(app)
      .post('/api/submit-form')
      .send({
        name: 'test name',
        email: 'test@example.com',
        phone: '1234567890',
        comment: 'test comment',
        filePath: 'path/to/file'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Form submitted');
    expect(response.body.form).toHaveProperty('id');
  });

  test('POST /submit-form should return an error if submission fails', async () => {
    formService.submitForm.mockRejectedValue(new Error('Submission failed'));

    const response = await request(app)
      .post('/api/submit-form')
      .send({
        name: 'test name',
        email: 'test@example.com',
        phone: '1234567890',
        comment: 'test comment',
        filePath: 'path/to/file'
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Submission failed');
  });
});
