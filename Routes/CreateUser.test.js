const request = require('supertest');
const express = require('express');
const createUserRouter = require('./CreateUser');

const app = express();
app.use(express.json());
app.use('/api', createUserRouter);

// Set a reasonable timeout for your tests
jest.setTimeout(10000);

test('should create a new user', async () => {
  const response = await request(app)
    .post('/api/createuser')
    .send({
      email: 'test@example.com',
      name: 'Test User',
      password: 'testpassword',
      location: 'Test Location'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
});

test('should not create a new user with invalid data', async () => {
  const response = await request(app)
    .post('/api/createuser')
    .send({
      email: 'invalidemail',
      name: 'Short',
      password: 'short',
      location: 'Test Location'
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
});

test('should login a user', async () => {
  const response = await request(app)
    .post('/api/loginuser')
    .send({
      email: 'test@example.com',
      password: 'testpassword'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.authToken).toBeDefined();
});

test('should not login a user with invalid credentials', async () => {
  const response = await request(app)
    .post('/api/loginuser')
    .send({
      email: 'invalid@example.com',
      password: 'invalidpassword'
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
});
