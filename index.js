// IMPORT MODULES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
app.use(bodyParser.json());
const dotenv = require("dotenv")
dotenv.config()

//IMPORT ROUTES
const userRoute = require('./routes/user')
const ProductRoute = require('./routes/product')
const CartRoute = require('./routes/cart')
const OrderRoute = require('./routes/order')
const AuthRoute = require('./routes/auth')

// CONFIGURE ROUTES URLS
app.use('/api/users', userRoute);
app.use('/api/products', ProductRoute);
app.use('/api/carts', CartRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/auth', AuthRoute);

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connection successfull')
}).catch(() => {
    console.log('Error connecting to database')
})

// LISTENING PORT
app.listen(process.env.PORT || 5000, () => {
    console.log("App listening at port 5000")
})