const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const mongoURI = 'mongodb://foodcone:foodcone123@ac-uqoc0tx-shard-00-00.p0pqwi4.mongodb.net:27017,ac-uqoc0tx-shard-00-01.p0pqwi4.mongodb.net:27017,ac-uqoc0tx-shard-00-02.p0pqwi4.mongodb.net:27017/foodconedb?ssl=true&replicaSet=atlas-g1dkln-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async (server) => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected');

    const foodCollection = await mongoose.connection.db.collection('fooditem');
    const foodCategoryCollection = await mongoose.connection.db.collection('categories');
    const customerReview = await mongoose.connection.db.collection('reviews');
    const data = await foodCollection.find({}).toArray();
    const catData = await foodCategoryCollection.find({}).toArray();
    const CusRev = await customerReview.find({}).toArray();
    global.foodCollection = data;
    global.foodCategoryCollection = catData;
    global.customerReview = CusRev;

    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.emit('foodData', data);
      socket.emit('categoryData', catData);
      socket.emit('reviewData', CusRev);


      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    const foodChangeStream = foodCollection.watch();
    foodChangeStream.on('change', async () => {
      const newData = await foodCollection.find({}).toArray();
      global.foodCollection = newData;
      io.emit('foodData', newData);
    });

    const CategoryChangeStream = foodCategoryCollection.watch();
    CategoryChangeStream.on('change', async () => {
      const newData = await foodCategoryCollection.find({}).toArray();
      global.foodCategoryCollection = newData;
      io.emit('categoryData', newData);
    });

    const reviewChangeStream = customerReview.watch();
    reviewChangeStream.on('change', async () => {
      const newData = await customerReview.find({}).toArray();
      global.customerReview = newData;
      io.emit('reviewData', newData);
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;

