const { Schema, model } = require("mongoose");


const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = model("Customer", UserSchema, "customer")
