const { Schema, model } = require("mongoose"); //Esquemas y modelos para trabajar con los documentos de la colección Stock.

//Esquema del producto
// const ProductSchema = Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     product_name: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: [String],
//         default: ["None"] //Si no se especifica su categoría es None
//     }
// })

//Esquema del Stock
const StockSchema = Schema({
    id: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}) //Esquema

module.exports = model("Stock", StockSchema, "stock")
                    // Primero va el nombre referido, luego el esquema para importar y finalmente la colección que se tendrá en cuenta