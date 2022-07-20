const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
    }
})

module.exports = mongoose.model('User', UserSchema);