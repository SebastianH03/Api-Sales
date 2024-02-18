const mongoose = require("mongoose");
const connection = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/xyz_sales") //Método de moongose para conectar a la base de datos xyz_sales (await en caso de que tarde)
        
        //Parámetros dentro de objetos (en caso de advertencias)
        // useNewUrlParser: true
        // useCreateIndex: true
        console.log("Conectado correctamente a la base de datos xyz_sales")

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos")
    }
} //por si acaso tarda la conexión en la base de datos

module.exports = {
    connection
}