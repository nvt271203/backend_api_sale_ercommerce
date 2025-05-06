const express = require('express');
const authRouter = require('./routers/auth');
const bannerRouter = require('./routers/banner');
const categoryRouter = require('./routers/category');
const subCategoryRouter = require('./routers/sub_category');
const productRouter = require('./routers/product');
const productReview = require('./routers/product_review');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const PORT = 3000;
const app = express();

// Middleware
app.use(express.json());   
app.use(cors());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReview);

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});