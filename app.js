const express = require('express');

const path = require('path');
const app = express();



const cors = require('cors');
const colors = require('colors');
const restaurantRoute = require('./router/restaurants');
const menuRoute = require('./router/menu');
const userRoute = require('./router/user');
const ordersRoute = require('./router/orders');
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
app.use('/orders', ordersRoute);
app.use(express.static(path.join(__dirname, '/public')));

mongoose.connect('mongodb+srv://raja98:anks2657@cluster0.bfswlwk.mongodb.net/food?retryWrites=true&w=majority' , ()=> {
    console.log(colors.yellow('MongoDB connected...'))
})


app.listen(4000);