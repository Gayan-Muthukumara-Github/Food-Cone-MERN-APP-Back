const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItems');

router.use(express.json());

router.post('/additems', async (req, res) => {
    try {
        await FoodItem.create({
            CategoryName: req.body.CategoryName,
            name: req.body.name,
            img: req.body.img,
            options: req.body.options,
            description: req.body.description,
        }).then(() => {
            res.json({ success: true });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
