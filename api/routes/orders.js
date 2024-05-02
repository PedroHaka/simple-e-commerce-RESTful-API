const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => ({
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        description: "Get Info on a Particular Order",
                        url: "/orders/" + doc._id
                    }
                }))

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

router.post('/', (req, res, next) => {

    //Creating Orders without Mongo/Mongoose
    /*const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }*/

    //Creating Orders using Mongo/Mongoose Integration
    Product.findById(req.body.productId)
        .then(product => {

            if (!product) {
                return res.status(404).json({
                    message: "Product not found in Database...",
                    error: err
                })
            }

            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save()
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Order created successfully!",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    description: "Get Info on the Newly Created Order!",
                    url: '/orders/' + result._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Order could not be stored correctly...",
                error: err
            })
        })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId

    Order.findById(id)
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: `Order with ID: ${id} could not be found...`
            })
        }
        res.status(200).json({
            message: `You have successfully fetched the order with ID:`,
            id: id,
            order: order,
            request: {
                type: 'GET',
                description: "Get Info on All Orders Available/Created!",
                url: '/orders'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: `Order with ID: ${id} could not be deleted from Database...`,
            error: err
        })
    })

    
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId

    Order.deleteOne({_id: id})
    .exec()
    .then(result => {
        if(result.deletedCount === 0){
            return res.status(404).json({
                message: `Order with ID: ${id} could not be found...`
            })
        }
        res.status(200).json({
            message: `You have successfully deleted the order with ID: ${id}`,
            request: {
                type: 'POST',
                description: "Create a New Order!",
                url: '/orders',
                body: {
                    productId: "mongoose.Types.ObjectId()",
                    quantity: "Number"
                }
            }
        })
    })
   
})

module.exports = router