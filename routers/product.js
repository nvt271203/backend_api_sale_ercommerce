const Product = require('../models/product');
const express = require('express');
const productRouter = express.Router();

//------------------------- Popular of product.
productRouter.post('/api/add-product', async (req, res)=>{
    try {
        const {productName, productPrice, quantity, description, category, vendorId, fullName, subCategory, images} = req.body;
        const product = new Product({productName, productPrice, quantity, description, category, vendorId, fullName, subCategory, images});
        await product.save();
        return res.status(201).send(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
productRouter.get('/api/popular-product', async (req, res)=>{
    try {
        const product = await Product.find({popular:true});
        if (!product || product.length==0) {
            return res.status(404).json({msg:"Products not found"});
        }else{
            return res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



//---------------------recommended
productRouter.post('/api/recommended-product', async (req, res)=>{
    try {
        const {productName, productPrice, quantity, description, category, subCategory, image} = req.body;
        const product = new Product({productName, productPrice, quantity, description, category, subCategory, image});
        await product.save();
        return res.status(201).send(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
productRouter.get('/api/recommended-product', async (req, res)=>{
    try { 
        const product = await Product.find({recommend:true});
        if (!product || product.length==0) {
            return res.status(404).json({msg:"Products not found"});
        }else{
            return res.status(200).json({product});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = productRouter;