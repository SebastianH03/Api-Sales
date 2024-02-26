const { Schema, model } = require("mongoose"); 

//Esquema de los proveedores.

const SupplierSchema = Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
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