router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require('crypto-js')
const jwt = require("jsonwebtoken")
const { verifyTokenAndAuthorization } = require('../middleware/middlewareFunctions')

// REGISTER API
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
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSPHASE).toString(),
    });
    // SAVE USER
    try {
        const savedUser = await new_user.save()
        res.status(200).json({ 'msg': 'User registered successfully ', user: savedUser });
    } catch (error) {
        res.status(424).json({ 'msg': 'Error registering User ', error: error });
    }
})

// LOGIN API
router.post('/login', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(404).json({ msg: "Wrong credentials" })
        const decryped_password = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASSPHASE)
        const string_password = decryped_password.toString(CryptoJS.enc.Utf8)
        string_password != req.body.password && res.status(404).json({ msg: "Wrong credentials" })
        // GENERATE ACCESS TOKEN
        const accessToken = jwt.sign({
            id: user._id,
            idAdmin: user.isAdmin
        }, process.env.JWT_SECRETE_KEY, { expiresIn: "3d" })

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken })
    } catch (error) {
        res.status(424).json({ 'msg': 'Error loging in user ', error: error });
    }
})

module.exports = router