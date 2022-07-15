const User = require('../models/User');
const express = require('express');

const router = express.Router();


router.post('/adduser', async (req, res) => {
    try{
        const tempUser = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        })
        const response = await tempUser.save();
        console.log('response for add user - ', response);
        res.status(201).json(response);
    }
    catch(err) {
        res.status(400).json(err);
    }
})



router.get('/allusers', async(req, res) => {
    try{
        const response = await User.find();
        res.status(200).json(response);
    }
    catch(err) {
        res.status(400).json(err);
    }
})

router.post('/login', async (req, res) => {
    const tempUsername = req.body.username;
    const tempPassword = req.body.password;
    try{
        const response = await User.find({username: tempUsername, password: tempPassword });
        //const response = await User.findOne({username: tempUsername});
        // if - response.password === tempPassword
        if(response.length === 0) {
            res.status(422).json('User Not Found');
        }
        else if (response.length === 1) {
            res.status(200).json(response[0]);
        }
        else {
            res.status(422).json('Error in Login. Plz contact customer care.');
        }
    }
    catch(err) {
        res.status(400).json(err);
    }
})


module.exports = router;
