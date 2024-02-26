const { Schema, model } = require("mongoose"); //Esquemas y modelos para trabajar con los documentos de la colección Stock.

//Esquema del registro de ventas
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
}) //Esquema

module.exports = model("Sales", SalesSchema, "sales")
                    // Primero va el nombre referido, luego el esquema para importar y finalmente la colección que se tendrá en cuenta