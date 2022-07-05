const express = require('express');

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





module.exports = router;