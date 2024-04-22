const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    
    product.save()
    .then(result => { console.log(result) })
    .catch(err => { console.log(err) })
    
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId

    if (id === 'special') {
        res.status(200).json({
            message: 'You have passed the "special" ID',
            id: id
        })
    }
    else {
        res.status(200).json({
            message: 'You have passed a random ID',
            id: id
        })
    }
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId

    res.status(200).json({
        message: `Updated the product with ID:${id}`,
        id: id
    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId

    res.status(200).json({
        message: `Deleted the product with ID:${id}`,
        id: id
    })
})


module.exports = router