router = require("express").Router()
const CryptoJS = require('crypto-js')
const User = require("../models/User")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/middlewareFunctions')

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

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ 'error': error, 'msg': 'Error finding user' })
    }
})

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ 'msg': 'User deleted successfully' })

    } catch (error) {
        res.status(500).json({ 'error': error, 'msg': 'Error deleting user' })
    }
})

module.exports = router