const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    orderid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    rest_id: {
        type: String,
    },
    rest_name: {
        type: String,
    },
    city: {
        type: String
    },
    amount: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Orders', OrdersSchema);
