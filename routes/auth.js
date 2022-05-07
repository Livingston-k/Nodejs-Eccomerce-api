const router = require("express").Router()
const User = require("../models/User")

router.post('/register', async(req, res) => {

    if (!req.body.username || !req.body.username || !req.body.username) {
        res.status(224).json({
            msg: "Fill all fields"
        })
    }
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(224).json(error)
    }
})

module.exports = router