router = require("express").Router()
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
    const harshedpassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSPHASE).toString()

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router