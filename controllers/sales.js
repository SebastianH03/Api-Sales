//dependencias
const validator = require("validator");
const Sales = require("../models/Sales");

const create = (req, res) => {
    
    // Recoger parámetros por post a guardar
    const parameters = req.body;

    // Validar los datos
    try{

        //Que no estén vacíos
        let val_salesman = !validator.isEmpty(parameters.salesman) 
            && validator.isLength(parameters.salesman, {min: 3, max:20}); //comprueba el tamaño
        let val_client = !validator.isEmpty(parameters.client) 
            && validator.isLength(parameters.client, {min: 3, max:20}); //comprueba el tamaño

        if(!val_salesman || !val_client){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }


    // Crear y asignar el objeto a guardar
    const sales = new Sales(parameters);

    // Guardar la venta en la base de datos
    sales.save()
        .then(savedSale => {
            if(!savedSale){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el producto"
                });
            }

            //Devolver resultado
            return res.status(200).json({
                status: "Success",
                stock: savedSale,
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
    console.log("Se ha ejecutado el método de prueba read de sales")

    let consulta = Sales.find({}).then( sale => {
        if(!sale){
            return res.status(400).json({
                status: "error",
                mensaje: "No se encontró la venta"
            })
        }

        return res.status(200).json({
            status: "Success",
            sale,
            mensaje: "Venta encontrada correctamente"
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
    console.log("Se ha ejecutado el método de prueba obtener artículo de sales")
    //recoger id por url
    let id = req.params.id; //id propio de mongo
    //buscar un articulo
    Sales.findById(id).then( sale => {
        if(!sale){
            //si no existe devolver error
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró la venta"
            });
        }
        //si existe devolver resultado
        return res.status(200).json({
            status: "Success",
            sale,
            mensaje: "Venta encontrado correctamente"
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
    let nombre = req.params.salesman;
    Sales.findOne({salesman: nombre}).then(sale => {
        if(!sale){
            return res.status(404).json({
                status:"error",
                mensaje: "No se ha encontrado la venta"
            });
        }
        return res.status(200).json({
            status: "Success",
            sale,
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
    console.log("Se ha ejecutado el método de prueba delete de sales")
    //recogemos el id para borrar
    let id = req.params.id;
    Sales.findOneAndDelete({_id: id}).then( deletedSale => {
        if(!deletedSale){
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado la venta"
            });
        }
        return res.status(200).json({
            status: "success",
            sale: deletedSale,
            mensaje: "Venta eliminada correctamente"
        });
    }).catch( error => {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const delByName = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de stock")
    let product_id = req.params.id_product;
    Stock.findOneAnd
}

const editar = (req, res) => {
    console.log("Se ha ejecutado el método de prueba editar de Stock")
    
    // Recoger producto a editar
    let id = req.params.id;

    // Recoger los nuevos datos del body
    let parameters = req.body;

    //validar datos
    try{
        //Que no estén vacíos
        let val_salesman = !validator.isEmpty(parameters.salesman) 
            && validator.isLength(parameters.salesman, {min: 3, max:20}); //comprueba el tamaño
        let val_client = !validator.isEmpty(parameters.client) 
            && validator.isLength(parameters.client, {min: 3, max:20}); //comprueba el tamaño

        if(!val_salesman || !val_client){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

    //buscar y actualizar artículo
    Sales.findOneAndUpdate({_id: id}, parameters).then( editedSale => {
        if(!editedSale){
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "success",
            sale: editedSale,
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
    //stock_prueba,
    create,
    read,
    uno,
    name,
    del,
    delByName,
    editar
}