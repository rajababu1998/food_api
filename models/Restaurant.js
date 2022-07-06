const mongoose = require('mongoose');


const RestaurantSchema = mongoose.Schema({
    rest_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    rest_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);