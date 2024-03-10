const { Schema, model } = require("mongoose"); 
const Stock = require("./Stock");
const Customer = require("./Customer");
const Users = require("./Users")

const SalesSchema = Schema({
    salesInfo:[{
        Stock:{
            type: Schema.Types.ObjectId,
            ref: "Stock",
            required: true
        },
        product:{
            type: Schema.Types.ObjectId,
            ref: "Stock.product",
            required: true
        },
        quantity:{
            type: Number,
            required:true
        }
    }],
    salesman_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Sales", SalesSchema, "sales")
