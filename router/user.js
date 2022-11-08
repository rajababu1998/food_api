const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const jwt = require('jsonwebtoken');


//http://localhost:4000/user/adduser
router.post('/adduser', async (req, res) => {
    console.log('--------------')
    try{   
        var salt = bcrypt.genSaltSync(10);
        const encodedPwd = await bcrypt.hash(req.body.password, salt);
        // console.log(req.body.password);
        // console.log(encodedPwd);
        const tempUser = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: encodedPwd
            // password: req.body.password
        })
        const response = await tempUser.save();
        console.log('response for add user - ', response);
        res.status(201).json(response);
    }
    catch(err) {
        res.status(400).json(err);
    }
})



router.get('/allusers', async (req, res) => {
    try{
        const response = await User.find();
        res.status(200).json(response);
    }
    catch(err) {
        res.status(400).json(err);
    }
})

// router.post('/login', async (req, res) => {
//     try{
//         const tempUsername = req.body.username;
//         const tempPassword = req.body.password;
//         console.log(tempPassword);
//         //console.log('inside login------')
//         // const response = await User.find({username: tempUsername, password: tempPassword });
//         // //const response = await User.findOne({username: tempUsername});
//         // // if - response.password === tempPassword
//         // if(response.length === 0) {
//         //     console.log('user not found------')
//         //     res.status(422).json('User Not Found');
//         // }
//         // else if (response.length === 1) {
//         //     //console.log('1 user found------')
//         //     //successfull login
//         //     //jwt - step 1
//         //     let obj = {};
//         //     obj.token = jwt.sign({username: response[0].username}, "newtonschool", {
//         //         expiresIn: 600
//         //     });
//         //     obj = {...obj, ...response[0]._doc};
//         //     // obj.userdata = response[0];
//         //     //console.log(obj);
//         //     res.status(200).json(obj);
//         // }
//         // else {
//         //     //console.log('multiple users found------')
//         //     res.status(422).json('Error in Login. Plz contact customer care.');
//         // }


//         const response = await User.findOne({username: tempUsername });
        
//         //username exists - {}
//         if(Object.keys(response).length !== 0) {
//             console.log('inside main if');
//             // if - response.password === tempPassword
//             if(bcrypt.compare(tempPassword, response.password)) {
//                 console.log('inside inner if');
//                 let obj = {};
//                 obj.token = jwt.sign({username: response.username}, "newtonschool", {
//                     expiresIn: 600
//                 });
//                 obj = {...obj, ...response._doc};
//                 res.status(200).json(obj);
//             }
//             else {
//                 console.log('inside inner else');
//                 console.log('user not found------')
//                 res.status(422).json({err: 'Invalid password'});
//             }
//         }
        
//         //username doest not exist
//         else {
//             console.log('inside main else');
//             res.status(422).json({err: 'Invalid username'});
//         }

//     }
//     catch(err) {
//         res.status(400).json(err);
//     }
// })


router.post('/login', async (req, res) => {
    const tempUsername = req.body.username;
    const tempPassword = req.body.password;

    try {
        // console.log('inside login.... ');
        const response = await User.find({username: tempUsername, password: tempPassword});

        if(response.length === 0) {
            // console.log('user not found .... ');
            res.status(422).json('User Not Found');
        }
        else if(response.length === 1) {
            // console.log('1 user found....')
            // res.status(200).json(response[0]);
            let obj = {};
            obj.token = jwt.sign({username: response[0].username}, "scanner", {
                expiresIn: 600
            })
            // obj.data = response[0];
            obj = {...obj, ...response[0]._doc}
            res.status(200).json(obj);
        }
        else {
            res.status(422).json('Error in Log in Plz contact customer care');
        }
    }
    catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;
