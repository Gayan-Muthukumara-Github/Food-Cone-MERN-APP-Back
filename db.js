const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const mongoURI = 'mongodb://foodcone:foodcone123@ac-uqoc0tx-shard-00-00.p0pqwi4.mongodb.net:27017,ac-uqoc0tx-shard-00-01.p0pqwi4.mongodb.net:27017,ac-uqoc0tx-shard-00-02.p0pqwi4.mongodb.net:27017/foodconedb?ssl=true&replicaSet=atlas-g1dkln-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async (server) => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected');

    const foodCollection = await mongoose.connection.db.collection('fooditem');
    const foodCategoryCollection = await mongoose.connection.db.collection('foodCategory');
    const customerReview = await mongoose.connection.db.collection('reviews');
    const data = await foodCollection.find({}).toArray();
    const catData = await foodCategoryCollection.find({}).toArray();
    const CusRev = await customerReview.find({}).toArray();
    global.foodCollection = data;
    global.foodCategoryCollection = catData;
    global.customerReview = CusRev;

    // Set up Socket.io
    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('A user connected');

      // Example: Emit data to the client when connected
      socket.emit('foodData', data);
      socket.emit('categoryData', catData);
      socket.emit('reviewData', CusRev);

      // Handle additional Socket.io events as needed

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;

