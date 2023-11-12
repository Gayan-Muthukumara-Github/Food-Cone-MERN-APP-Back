const request = require('supertest');
const express = require('express');
const customerReviewRouter = require('./CustomerReviews.js'); 

const app = express();
app.use(express.json());
app.use('/api', customerReviewRouter); 

test('should give reviews', async () => {
  const response = await request(app)
    .post('/api/givereviews')
    .send({
      message: 'Great service!',
      name: 'John Doe',
      jobrole: 'Engineer',
      city: 'New York'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
});

test('should get review details', async () => {
  const response = await request(app)
    .post('/api/reviewDetails');

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual(expect.any(Array));
 
});


