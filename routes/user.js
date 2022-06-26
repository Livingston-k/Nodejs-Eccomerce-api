router = require("express").Router()
const CryptoJS = require('crypto-js')
const User = require("../models/User")
const { verifyTokenAndAuthorization } = require('../middleware/middlewareFunctions')

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
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
    //  HARSH PASSWORD
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSPHASE).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ 'error': error, 'msg': 'Error updating user' })
    }
})

module.exports = router