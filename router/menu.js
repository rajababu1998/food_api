const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

router.get('/:restid', async (req, res) => {
    try {
        const tempid = req.params.restid;
        const response = await Menu.find({rest_id: tempid});
        res.status(200).json(response);
    }
    catch(err) {
        res.status(400).json(err);
    }
})


router.post('/', async (req, res) => {
    try{
        const tempMenu = new Menu({
            rest_id: req.body.rest_id,
            food_id: req.body.food_id,
            food_name: req.body.food_name,
            food_type: req.body.food_type,
            food_category: req.body.food_category,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        })
        //database operation
        const response = await tempMenu.save();
        res.status(201).json(response);
    }
    catch(err){
        res.status(400).json(err);
    }
})


module.exports = router;