router = require("express").Router()

router.get('/', (req, res) => {
    res.send("products")
})

module.exports = router