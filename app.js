const express = require('express');
const app = express();
const restaurantRoute = require('./router/restaurants');

const router = express.Router();

app.get('/', (req, res) => {
    try{
        console.log('server started...');
        res.send('app running.')
    }
    catch{

    }
})

app.use('/restaurants', restaurantRoute);





app.listen(4000);