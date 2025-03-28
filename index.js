const express = require('express'); 
const authRouter = require('./routers/auth');
const bannerRouter = require('./routers/banner');
const categoryRouter = require('./routers/category');
const subCategoryRouter = require('./routers/sub_category');
const productRouter = require('./routers/product');
const productReview = require('./routers/product_review');
const cors = require('cors');

const mongoose = require('mongoose');
const DB = "mongodb+srv://nvtai2712:mryrsr82oHdqSgjx@cluster0.fgjnz.mongodb.net/";

const PORT = 3000; 
const app = express(); 



//Định nghĩa 1 API sau khi đã thiết lập
app.use(express.json());
app.use(cors());
app.use(authRouter)
app.use(bannerRouter)
app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(productRouter)
app.use(productReview)


mongoose.connect(DB).then(()=>{
    console.log('mongodb connected');
})


app.listen(PORT,"0.0.0.0", function(){ 
    console.log(`Server is running on port ${PORT}`)
})