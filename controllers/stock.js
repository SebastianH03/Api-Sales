//dependencias
const validator = require("validator");
const Stock = require("../models/Stock");

//Creación de métodos
const controller = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador"
    })
}

// const stock_prueba = (req, res) => {

//     console.log("Se ha ejecutado el método de prueba de stock");
//     return res.status(200).json([{
//         id_product: "ajjfhjr211",
//         nombre: "Cepillo",
//         categoria: ["Limpieza", "Salud"]
//     },
//     {
//         nombre: "ProbandoJson",
//         id_product: "jtyuj67tyjkytukjyukj"
//     }]);
// }

const create = (req, res) => {
    
    // Recoger parámetros por post a guardar
    const parametros = req.body;

    // Validar los datos
    try{

        //Que no estén vacíos
        let validar_quantity = !validator.isEmpty(parametros.quantity);
        let validar_product = !validator.isEmpty(parametros.product) 
            && validator.isLength(parametros.product, {min: 3, max:20}); //comprueba el tamaño

        if(!validar_product || !validar_quantity){
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

//Lectura general
const read = (req, res) =>{
    console.log("Se ha ejecutado el método de prueba read de stock")

    //Organizar la consulta de mayor a menor:
    const orden = req.query.orden || 'asc';
    
    //Objeto de ordenamiento -> Cantidad en este caso
    const ordenamiento = {quantity: orden === 'desc' ? -1: 1};

    //Objeto Stock se le encadenan varios métodos
    let consulta = Stock.find({}).sort(ordenamiento).then( producto => {
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


//end point para extraer un sólo producto
const uno = (req, res) => {
    console.log("Se ha ejecutado el método de prueba obtener artículo de stock")
    //recoger id por url
    let id = req.params.id; //id propio de mongo
    //buscar un articulo
    Stock.findById(id).then( producto => {
        if(!producto){
            //si no existe devolver error
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el producto"
            });
        }
        //si existe devolver resultado
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
        });
    })
}

//Búsqueda según su nombre
const name = (req, res) => {
    let nombre = req.params.nombre;
    Stock.findOne({product: nombre}).then(producto => {
        if(!producto){
            return res.status(404).json({
                status:"error",
                mensaje: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "Success",
            producto,
            mensaje: "Encontrado correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Delete
const del = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de stock")
    //recogemos el id para borrar
    let id = req.params.id;
    Stock.findOneAndDelete({_id: id}).then( productoBorrado => {
        if(!productoBorrado){
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "success",
            producto: productoBorrado,
            mensaje: "Objeto eliminado correctamente"
        })
    }).catch( error => {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        })
    })
}

const delByName = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de stock")
    let product_id = req.params.id_product;
    Stock.findOneAnd
}


module.exports = {
    controller,
    //stock_prueba,
    create,
    read,
    uno,
    name,
    del,
    delByName
}