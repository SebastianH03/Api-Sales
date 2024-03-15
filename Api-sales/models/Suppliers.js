const { Schema, model } = require("mongoose"); 

const SupplierSchema = Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: [String],
        default: []
    },
    address: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    }
})

module.exports = model("Suppliers", SupplierSchema, "suppliers")
