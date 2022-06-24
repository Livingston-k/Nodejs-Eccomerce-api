router = require("express").Router()

router.get('/users', (req, res) => {
    res.send("User test is successfull")
})

router.post('/save_user', (req, res) => {
    let name = req.body.name;
    console.log(name)
    res.send("Your name is " + name);
})


module.exports = router