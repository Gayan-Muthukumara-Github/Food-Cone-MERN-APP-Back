const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const http = require('http');
const socketIOClient = require('socket.io-client');
const mongoDB = require('./db');

let mongoServer;
let server;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();  // Use start method instead of relying on getUri directly
    const mongoUri = mongoServer.getUri();
  
    server = http.createServer();
    mongoDB(server, mongoUri);
  
    await new Promise((resolve) => server.listen(resolve));
  });
  

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await new Promise((resolve) => server.close(resolve));
});

test('should connect to MongoDB and emit data via sockets', (done) => {
  const socket = socketIOClient(`http://localhost:${server.address().port}`);

  socket.on('connect', () => {
    
    socket.on('foodData', (data) => {
      expect(data).toEqual(expect.any(Array));
    });

    socket.on('categoryData', (catData) => {
      expect(catData).toEqual(expect.any(Array));
    });

    socket.on('reviewData', (CusRev) => {
      expect(CusRev).toEqual(expect.any(Array));
      socket.disconnect();
      done();
    });
  });
});
