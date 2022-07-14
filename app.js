const express = require('express');
const app = express();
const cors = require('cors');
const restaurantRoute = require('./router/restaurants');
const menuRoute = require('./router/menu');
const userRoute = require('./router/user');
const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    try{
        console.log('server started...');
        res.send('app running.')
    }
    catch{

    }
})

app.use('/restaurants', restaurantRoute);
app.use('/menu', menuRoute);
app.use('/user', userRoute);

mongoose.connect('mongodb+srv://testuser001:z9xsFuktzYAs4fMk@cluster0.2eq41.mongodb.net/foodie?retryWrites=true&w=majority')


app.listen(4000);