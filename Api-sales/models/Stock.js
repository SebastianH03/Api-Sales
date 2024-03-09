const { Schema, model } = require("mongoose");


const ProductSchema = Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    tags:{
        type:[String],
        default:[]
    },
    provider:{
        type: Schema.Types.ObjectId,
        ref: 'Suppliers' //Referencia a la colección de proveedores
    }
})



const StockSchema = Schema({
    product: ProductSchema,
    quantity: {
        type: Number,
        required: true
    }
}) 

module.exports = model("Stock", StockSchema, "stock")
