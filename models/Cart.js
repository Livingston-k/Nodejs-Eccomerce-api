const mongoose = require('mongoose')
CartSchema = mongoose.Schema({
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
    status: {
        type: Boolean,
        default: true
    }
}, { timestamp: true });

modules.exports = mongoose.model('Cart', CartSchema)