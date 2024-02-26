const { Schema, model } = require("mongoose"); 

//Esquema del historial.

const HistorySchema = Schema({
    date: {
        type: Date,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    collection: {
        type: String,
        require: true
    }
})

module.exports = model("History", HistorySchema, "history")
