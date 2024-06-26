const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {

    //Test code for GET requests without MongoDB/Mongoose
    /*res.status(200).json({
        message: 'Handling GET requests to /products'
    })*/

    //Actual Mongo/Mongoose Integrated response from GET requests
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            //console.log(docs)
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            description: 'Get Info on this Particular Product',
                            url: '/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    //Test code for POST requests without MongoDB/Mongoose
    /*res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    })*/

    //Actual Mongo/Mongoose Integrated response from POST requests
    product.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Created product successfully!',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        description: 'Get Info on this Particular Product',
                        url: '/products/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId

    //Test code for GET requests without MongoDB/Mongoose
    /*if (id === 'special') {
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
    }*/

    //Actual Mongo/Mongoose Integrated response from GET requests using ID
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("From database", doc)
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'Get a List of All Products',
                        url: '/products/'
                    }
                })
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId

    //Test code for PATCH requests without MongoDB/Mongoose
    /*res.status(200).json({
        message: `Updated the product with ID:${id}`,
        id: id
    })*/

    //Actual Mongo/Mongoose Integrated response from PATCH requests using ID
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(result => {
            res.status(200).json({
                message: 'Product updated successfully!',
                request: {
                    type: 'GET',
                    description: 'Get Info on this Particular Product',
                    url: '/products/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({
                error: err
            })
        })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId

    //Test code for DELETE requests without MongoDB/Mongoose
    /*res.status(200).json({
        message: `Deleted the product with ID:${id}`,
        id: id
    })*/

    //Actual Mongo/Mongoose Integrated response from DELETE requests using ID
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted successfully!',
                request: {
                    type: 'POST',
                    description: 'Create a New Product',
                    body: {
                        name: "String",
                        price: "Number"
                    },
                    url: '/products/'
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router