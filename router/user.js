const User = require('../models/User');
const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');


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
        //console.log('inside login------')
        const response = await User.find({username: tempUsername, password: tempPassword });
        //const response = await User.findOne({username: tempUsername});
        // if - response.password === tempPassword
        if(response.length === 0) {
            console.log('user not found------')
            res.status(422).json('User Not Found');
        }
        else if (response.length === 1) {
            //console.log('1 user found------')
            //successfull login
            //jwt - step 1
            let obj = {};
            obj.token = jwt.sign({username: response[0].username}, "newtonschool", {
                expiresIn: 600
            });
            obj = {...obj, ...response[0]._doc};
            // obj.userdata = response[0];
            //console.log(obj);
            res.status(200).json(obj);
        }
        else {
            //console.log('multiple users found------')
            res.status(422).json('Error in Login. Plz contact customer care.');
        }
    }
    catch(err) {
        res.status(400).json(err);
    }
})


module.exports = router;
