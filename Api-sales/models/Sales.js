const { Schema, model } = require("mongoose"); 
const Stock = require("./Stock");
const Customer = require("./Customer");
const Users = require("./Users")

const SalesSchema = Schema({
    salesInfo:[{
        stock_id:{
            type: Schema.Types.ObjectId,
            ref: "Stock",
            required: true
        },
        product_id:{
            type: Schema.Types.ObjectId,
            ref: "Stock.product",
            required: true
        },
        product_name:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required:true
        }
    }],
    salesman: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Sales", SalesSchema, "sales")
