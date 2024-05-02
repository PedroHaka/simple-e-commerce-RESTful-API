//In this file we are creating our mongoose models for products.
//First we import mongoose:
const mongoose = require('mongoose')

//Now we define the schema for our products
const productSchema = mongoose.Schema({
    //Mongoose IDs are not serial numbers like in SQL databases,
    //but rather a long-ass string with all kinds of symbols.
    //And this is how we define the type for our ID:
    _id: mongoose.Schema.Types.ObjectId,
    
    //The other properties of our schema object are defined as
    //normal Javascript types, with a initial capital letter:
    name: {type: String, required: true},
    price: {type: Number, required: true}
})

//Now for exportation of our schema, use the mongoose model method,
//that receives two arguments, the first is the name we want it to be
//known as, starting with capital letter as a convention. The second
//is the schema we just created above.
module.exports = mongoose.model("Product", productSchema)

