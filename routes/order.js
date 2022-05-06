router = require("express").Router()

router.get('/user_test', (req, res) => {
    res.send("User test is successfull")
})

module.exports = router