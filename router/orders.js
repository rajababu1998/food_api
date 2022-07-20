const express = require('express');
const Orders = require('../models/Orders');

const router = express.Router();

//http://localhost:4000/orders/placeorder
router.post('/placeorder', async(req, res) => {
    try{
        const tempOrder = new Orders({
            orderid: parseInt(Math.random()*10000000000),
            rest_id: req.body.rest_id,
            rest_name: req.body.rest_name,
            city: req.body.city,
            amount: req.body.amount
        })
        const response = await tempOrder.save();
        res.status(201).json(response);
    }
    catch(err) {
        res.status(400).json(err);
    }
})


router.get('/allorders', async(req, res) => {
    try{
        
        const response = await Orders.find();
        res.status(200).json(response);
    }
    catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;