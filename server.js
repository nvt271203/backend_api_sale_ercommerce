const express = require("express");
const cors = require("cors");

const authRouter = require('./routers/auth');
const bannerRouter = require('./routers/banner');
const categoryRouter = require('./routers/category');
const subCategoryRouter = require('./routers/sub_category');
const productRouter = require('./routers/product');
const productReview = require('./routers/product_review');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(authRouter)
app.use(bannerRouter)
app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(productRouter)
app.use(productReview)

// Test route
app.get("/", (req, res) => {
  res.send("Hello, This is Backend API for Nodejs");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
