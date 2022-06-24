router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require('crypto-js')

router.post('/register', async (req, res) => {
    // VALIDATE
    if (req.body.username == "") {
        res.status(424).json({ 'msg': 'Please enter user name ', });
    }
    if (req.body.email == "") {
        res.status(424).json({ 'msg': 'Please enter email address ', });
    }
    if (req.body.password == "") {
        res.status(424).json({ 'msg': 'Please enter password', });
    }
    // RECIEVE USER INPUTS
    const new_user = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSPHASE),
    });
    // SAVE USER
    try {
        const savedUser = await new_user.save()
        res.status(200).json({ 'msg': 'User registered successfully ', user: savedUser });
    } catch (error) {
        res.status(424).json({ 'msg': 'Error registering User ', error: error });

    }
})


module.exports = router