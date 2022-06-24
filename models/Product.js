const mongoose = require('mongoose')
ProductSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamp: true });

module.exports = mongoose.model('Product', ProductSchema)