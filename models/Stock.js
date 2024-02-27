const { Schema, model } = require("mongoose");


const StockSchema = Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}) 

module.exports = model("Stock", StockSchema, "stock")
