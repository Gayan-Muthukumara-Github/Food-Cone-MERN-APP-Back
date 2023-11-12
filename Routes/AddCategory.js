const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

router.post('/addcategory', async (req, res) => {
    
    try {
        await Category.create({
            CategoryName: req.body.CategoryName
        }).then(() => {
            res.json({ success: true })
        })
    } catch (error) {
        console.log(error.message)
        res.send("Server Error", error.message)

    }
    
});

module.exports = router;