router = require("express").Router()

router.get('/', (req, res) => {
    res.send("Cart List")
})

module.exports = router