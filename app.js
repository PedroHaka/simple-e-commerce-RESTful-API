//First of all we import express and create our express app by using express().
const express = require('express')
const app = express()
//morgan is a log service, everytime a request is made to our server, it logs out in
//the terminal what kind of request was made. Great for development/debug.
const morgan = require('morgan')
//body parser is a tool that lets us parse our request bodies, as it is not easily 
//readable by default on node.js. 
const bodyParser = require('body-parser')
//Mongoose is a mongodb ODM that makes manipulating data super simple. Also allows for
//object data model setup.
const mongoose = require('mongoose')

//Here we deal with CORS issues by sending the apropriate headers on our requests/responses.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control_Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

//Here we create our routes, or the URLs that our API supports. Yes, after the CORS handling.
//Keep in mind that theses paths are from our Node.js app, in other words our back end,
//and not the URLs shown in our browser when consuming our API in the front end layer.
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

//Here we actually 'use' morgan and body-parser, allowing our app to now log requests, and
//we can now also extract our request bodies in a json format, which is simpler to read. 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Here we tell our app which URL matches each previously created route.
//This is the URL shown in our browser when using our API, not the backend path.
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

//MongoDB/Mongoose connection via connection string configuration, the password is 
//stored in the 'MONGO_ATLAS_PW' environment variable, in nodemon.json file.
mongoose.connect('mongodb+srv://pedrohaka94:' +
    process.env.MONGO_ATLAS_PW
    + '@cluster0.qjnnh23.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

//Here we deal with error handling on requests that didn't match
//any of the routes we have created. In other words, requests with bad URL
//or requests using http methods not supported by our API.
app.use((req, res, next) => {
    const error = new Error('Error 404: Resource Not Found.')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

//Export this module, so we can use it in conjunction with other modules,
//like server.js.
module.exports = app
