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

// http://localhost:4000/restaurants/delhi

router.get('/:city', async (req, res) => {
    try{
        const cityName = req.params.city.toLowerCase();
        const response = await Restaurant.find({location: cityName});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json(err);
    }
})

// http://localhost:4000/restaurants/search?city=delhi&id=id001&foodtype=&foodcat=sweet
// router.get('/search', async(req, res)
// req.query.city
// req.query.id

//http://localhost:4000/restaurants/search/id001
router.get('/search/:id', async(req, res) => {
    try{
        const tempId = req.params.id;
        const response = await Restaurant.findOne({rest_id: tempId});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json(err);
    }
} )

router.get('/', async (req, res) => {
    try{
        // const city = req.query.city;
        // const foodtype = req.query.foodtype;
        // console.log('restaurants query started...');
        // res.send('restaurants query app running.')
        const response = await Restaurant.find();
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json(err);
    }
})



//http://localhost:4000/restaurants
router.post('/', async (req, res) => {
    try{
        const tempRestaurant = new Restaurant({
            rest_id: req.body.rest_id,
            rest_name: req.body.rest_name,
            location: req.body.location.toLowerCase(),
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

//http://localhost:4000/restaurants/update
router.put('/update', async (req, res) => {
    try{
        const tempRestaurant = {
            rest_id: req.body.rest_id,
            rest_name: req.body.rest_name,
            location: req.body.location.toLowerCase(),
            category: req.body.category,
            image: req.body.image,
        }
        const response = await Restaurant.findOneAndUpdate({'rest_id': tempRestaurant.rest_id}, tempRestaurant, {new: true});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;