//dependencias
const validator = require("validator");
const Stock = require("../models/Stock");

//Creación de métodos
const controller = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador"
    })
}

const stock_prueba = (req, res) => {

    console.log("Se ha ejecutado el método de prueba de stock");
    return res.status(200).json([{
        id: "ajjfhjr211",
        nombre: "Cepillo",
        categoria: ["Limpieza", "Salud"]
    },
    {
        nombre: "ProbandoJson",
        id: "jtyuj67tyjkytukjyukj"
    }]);
}

const create = (req, res) => {
    
    // Recoger parámetros por post a guardar
    const parametros = req.body;

    // Validar los datos
    try{

        //Que no estén vacíos
        let validar_id = !validator.isEmpty(parametros.id);
        let validar_quantity = !validator.isEmpty(parametros.quantity);
        let validar_product = !validator.isEmpty(parametros.product) 
            && validator.isLength(parametros.product, {min: 3, max:20}); //comprueba el tamaño

        if(!validar_id || !validar_product || !validar_quantity){
            throw new Error("No se ha completado todos los campos");
        }

    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }
    // Crear y asignar el objeto a guardar
    const stock = new Stock(parametros);

    // Guardar el artículo en la base de datos
    stock.save()
        .then(stockGuardado => {
            if(!stockGuardado){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el producto"
                });
            }

            //Devolver resultado
            return res.status(200).json({
                status: "Success",
                stock: stockGuardado,
                mensaje: "Articulo guardado correctamente"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                mensaje: "No se ha guardado el producto",
                error: error.message
            });
        });  
}

const read = (req, res) =>{
    console.log("Se ha ejecutado el método de prueba read de stock")
    let consulta = Stock.find({}).then( producto => {
        if(!producto){
            return res.status(400).json({
                status: "error",
                mensaje: "No se encontró el producto"
            })
        }

        return res.status(200).json({
            status: "Success",
            producto,
            mensaje: "Producto encontrado correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            mensaje: "ha ocurrido un error",
            error: error.message
        })
    })
    return consulta
}

const del = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de stock")
    let product_id = req.parametros.id;
    Stock.findOneAnd
}


module.exports = {
    controller,
    stock_prueba,
    create,
    read
}