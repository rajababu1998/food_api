const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();


// router.get('/', (req, res) => {
//     try{
//         console.log('restaurants  started...');
//         res.send('restaurants  app running.')
//     }
//     catch{

//     }
// })

router.get('/:city', (req, res) => {
    try{
        const cityName = req.params.city
        console.log('restaurants params started...');
        res.send('restaurants params running.')
    }
    catch{

    }
})

router.get('/', (req, res) => {
    try{
        const city = req.query.city;
        const foodtype = req.query.foodtype;
        console.log('restaurants query started...');
        res.send('restaurants query app running.')
    }
    catch{

    }
})


router.post('/', async (req, res) => {
    try{
        const tempRestaurant = new Restaurant({
            rest_id: req.body.rest_id,
            rest_name: req.body.rest_name,
            location: req.body.location,
            category: req.body.category,
            image: req.body.image,
        })
        //database operation
        const response = await tempRestaurant.save();
        res.status(201).json(response);
    }
    catch(err){
        res.status(400).json(err);
    }
})




module.exports = router;