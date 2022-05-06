// IMPORT MODULES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

//ROUTES
const userRoute = require('./routes/user')

app.use('/api/users', userRoute);
// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connection successfull')
}).catch(() => {
    console.log('Error connecting to database')
})

// ROUTES


// LISTENING PORT
app.listen(process.env.port || 5000, () => {
    console.log("App listening at port 5000")
})