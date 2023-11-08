const express = require('express')
const router = express.Router()
const Reviews = require('../models/Reviews')

router.post('/givereviews', async (req, res) => {
    
    try {
        await Reviews.create({
            message: req.body.message,
            name: req.body.name,
            jobrole: req.body.jobrole,
            city: req.body.city
        }).then(() => {
            res.json({ success: true })
        })
    } catch (error) {
        console.log(error.message)
        res.send("Server Error", error.message)

    }
    
})

router.post('/reviewDetails', async (req, res) => {
    try {
        res.send([global.customerReview])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
    

});

module.exports = router;