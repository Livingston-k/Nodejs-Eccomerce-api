const mongoose = require('mongoose')
OrderSchema = mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: {
            type: String
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Pending' },
}, { timestamp: true });

modules.exports = mongoose.model('Order', OrderSchema)