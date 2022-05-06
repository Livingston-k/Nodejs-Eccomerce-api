const mongoose = require('mongoose')
UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamp: true });
modules.exports = mongoose.model('User', UserSchema)