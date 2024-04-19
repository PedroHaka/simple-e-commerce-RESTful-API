const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'You have fetched the orders list successfully!'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    res.status(201).json({
        message: 'You have successfully created a new order!',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId

    res.status(200).json({
        message: `You have successfully fetched the order with ID: ${id}!`,
        id: id
    })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId

    res.status(200).json({
        message: `You have successfully deleted the order with ID: ${id}!`,
        id: id
    })
})

module.exports = router