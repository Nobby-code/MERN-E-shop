import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desk    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
    } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order =  new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice 
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

export { addOrderItems }