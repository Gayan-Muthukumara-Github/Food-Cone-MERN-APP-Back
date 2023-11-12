const request = require('supertest');
const express = require('express');
const orderDataRouter = require('./OrderData'); 
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(express.json());
app.use('/api', orderDataRouter); 

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('should add order data for a user', async () => {
  const response = await request(app)
    .post('/api/orderData')
    .send({
      email: 'test@example.com',
      order_data: [{ item: 'Product 1', quantity: 2 }],
      order_date: new Date()
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
});

test('should retrieve order data for a user', async () => {
  
  const response = await request(app)
    .post('/api/myOrderData')
    .send({
      email: 'test@example.com'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.orderData).toBeDefined();
  
});


