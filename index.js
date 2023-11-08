const express = require('express');
const mongoDB = require('./db');
const app = express();
const port = 5000;

(async () => {
  await mongoDB();
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://foodconefront.onrender.com");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.get('/', (req, res) => {
    res.send('Hello, this is the root route Gayan!');
  });
  app.use(express.json())
  app.use('/api', require("./Routes/CreateUser"));
  app.use('/api', require("./Routes/DisplayData"));
  app.use('/api', require("./Routes/OrderData"));
  app.use('/api', require("./Routes/CustomerReviews"));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
