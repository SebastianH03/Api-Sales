//dependencias
const validator = require("validator");
const Stock = require("../models/Stock");

//Creación de métodos

//Crear

const create = (req, res) => {
    const parametros = req.body;
    try{
        let validar_quantity = !validator.isEmpty(parametros.quantity);
        let validar_product = !validator.isEmpty(parametros.product) 
            && validator.isLength(parametros.product, {min: 3, max:20});
        if(!validar_product || !validar_quantity){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }
    const stock = new Stock(parametros);
    stock.save()
        .then(stockGuardado => {
            if(!stockGuardado){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el producto"
                });
            }
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
    const orden = req.query.orden || 'asc';
    const ordenamiento = {quantity: orden === 'desc' ? -1: 1};
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


//Lectura por ID

const read_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba obtener artículo de stock")
    let id = req.params.id;
    Stock.findById(id).then( producto => {
        if(!producto){
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el producto"
            });
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
        });
    })
}

//Lectura por nombre
const read_by_name = (req, res) => {
    let name = req.params.name;
    Stock.findOne({product: name}).then(producto => {
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

//Borrar por ID
const del_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de stock")
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
        });
    }).catch( error => {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Borrar por nombre
const del_by_name = (req, res) => {
    let name = req.params.name;
    Stock.findOneAndDelete({product: name}).then(producto => {
        if(!producto){
            return res.status(404).json({
                status:"error",
                mensaje: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "Success",
            producto,
            mensaje: "Producto eliminado correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Editar

const edit = (req, res) => {
    console.log("Se ha ejecutado el método de prueba editar de Stock")
    let id = req.params.id;
    let parametros = req.body;
    try{
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
    Stock.findOneAndUpdate({_id: id}, parametros).then( producto => {
        if(!producto){
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "success",
            producto: producto,
            mensaje: "Objeto editado correctamente"
        });
    }).catch( error => {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

module.exports = {
    create,
    read,
    read_by_id,
    read_by_name,
    del_by_id,
    del_by_name,
    edit
}