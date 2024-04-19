const express = require('express')
const app = express()
const morgan = require('morgan')//morgan is a log service,
//everytime a request is made to our server, it logs out in
//the terminal what kind of request was made.
const bodyParser = require('body-parser')//body parser is 
//a tool that lets us parse our request bodies, as it is
//not easily readable by default on node.js. 

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

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

module.exports = app
