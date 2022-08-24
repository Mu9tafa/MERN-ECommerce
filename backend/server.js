const express = require('express');
require('express-async-errors');
const path = require('path');

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log(
    'Shutting down the server due to Uncaught Exceptions : ' + err.message
  );
  process.exit(1);
});

const errorMiddleware = require('./middleware/errorMiddleware');
const Product = require('./models/productModel');

// Setting up config file
require('dotenv').config({ path: path.join(__dirname, './config/config.env') });

// Connect database
require('./config/db');

// Import all Routers
const productsRouter = require('./routes/productsRouter');

const app = express();

app.use(express.json());

// Seeding data from data source
// const seed = async () => {
//   await Product.deleteMany();
//   await Product.insertMany(require('./data/products.json'));
// };
// seed();

app.use('/api/v1', productsRouter);

// error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(
    'Shutting down the server due to unhandled promise rejection : ' +
      err.message
  );
  server.close(() => {
    process.exit(1);
  });
});
