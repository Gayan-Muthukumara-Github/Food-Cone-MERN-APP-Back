const request = require('supertest');
const express = require('express');
const displayDataRouter = require('./DisplayData'); 
const app = express();
app.use(express.json());
app.use('/api', displayDataRouter); 

test('should get food data', async () => {
    
  const response = await request(app)
    .post('/api/foodData');

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual(expect.any(Array));
  
});


