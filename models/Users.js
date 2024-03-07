const { Schema, model } = require("mongoose");


const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true
    }
})

module.exports = model("Users", UserSchema, "users")
