const { Schema, model } = require("mongoose"); 

const SalesSchema = Schema({
    product: [{
        type: String,
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
        type: Date
    }
})

module.exports = model("Sales", SalesSchema, "sales")
