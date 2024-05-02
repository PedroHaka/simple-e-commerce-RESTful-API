//In this file we are creating our mongoose models for orders.
//First we import mongoose:
const mongoose = require('mongoose')

//Now we define the schema for our orders
const orderSchema = mongoose.Schema({
    //Mongoose IDs are not serial numbers like in SQL databases,
    //but rather a long-@$$ string with all kinds of symbols.
    //And this is how we define the type for our ID:
    _id: mongoose.Schema.Types.ObjectId,
    
    //The next property is an available product, which was of course
    //created beforehand. We will reference our products by their IDs,
    //while also keeping in mind that the type for our Mongo/Mongoose 
    //IDs are 'mongoose.Schema.Types.ObjectId'. We also need to pass a 'ref'
    //key, which is the name of our Product Schema/Model. Like this:
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    //We also need a quantity of products for our order, which we can set
    //the default amount to 1. See the syntax below:
    quantity: { type: Number, default: 1 }
    
})

//Now for exportation of our schema, use the mongoose model method,
//that receives two arguments, the first is the name we want it to be
//known as, starting with capital letter as a convention. The second
//is the schema we just created above.
module.exports = mongoose.model("Order", orderSchema)