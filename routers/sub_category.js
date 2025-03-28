const express = require('express');
const SubCategory = require('../models/sub_category');

const subCategoryRouter = express.Router();
subCategoryRouter.post('/api/subCategories', async(req, res)=>{
    try {
        const {categoryId, categoryName, image, subCategoryName} = req.body;
        const subCategory = new SubCategory({categoryId, categoryName, image, subCategoryName});
        await subCategory.save();
        res.status(201).send(subCategory);     
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});
subCategoryRouter.get('/api/subcategories', async (req, res) =>{
    try {
        const subcategories = await SubCategory.find();
        return res.status(200).json(subcategories)
    } catch (e) {
        return res.status(500).json({error:e.message});
    }
})


subCategoryRouter.get('/api/category/:categoryName/subCategories', async(req, res)=>{
    try {
        const {categoryName} = req.params;
        const subCategories = await SubCategory.find({categoryName});

        if(!subCategories || subCategories.length == 0){
            return res.status(404).json({msg: "SubCategories not found"});
        }else{
            return res.status(200).json(subCategories);
        }
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});


module.exports = subCategoryRouter;