const { Schema, model } = require("mongoose"); //Esquemas y modelos para trabajar con los documentos de la colección Stock.


//Esquema del Stock
const UserSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        require: true
    }
}) //Esquema

module.exports = model("Users", UserSchema, "users")
                    // Primero va el nombre referido, luego el esquema para importar y finalmente la colección que se tendrá en cuenta