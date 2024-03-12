const { Schema, model } = require("mongoose");
const Suppliers = require("./Suppliers");

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
        type: String,
        required: true
    },
    providerName:{
        type:String
    }
});

const StockSchema = Schema({
    product: ProductSchema,
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = model("Stock", StockSchema, "stock")
