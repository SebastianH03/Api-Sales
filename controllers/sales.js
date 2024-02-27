const validator = require("validator");
const Sales = require("../models/Sales");

const create = (req, res) => {
    const parameters = req.body;    
    try{
        let val_salesman = !validator.isEmpty(parameters.salesman) 
            && validator.isLength(parameters.salesman, {min: 3, max:20});
        let val_client = !validator.isEmpty(parameters.client) 
            && validator.isLength(parameters.client, {min: 3, max:20});
        if(!val_salesman || !val_client){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }
    const sales = new Sales(parameters);
    sales.save()
        .then(savedSale => {
            if(!savedSale){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el producto"
                });
            }
            return res.status(200).json({
                status: "Success",
                sales: savedSale,
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


//Lectura por ID
const read_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba obtener artículo de sales")
    let id = req.params.id;
    Sales.findById(id).then( sale => {
        if(!sale){
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró la venta"
            });
        }
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

//Lectura por nombre
const read_by_name = (req, res) => {
    let name = req.params.name;
    Sales.findOne({salesman: name}).then(sale => {
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
const del_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de sales")
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

const del_by_name = (req, res) => {
    let name = req.params.name;
    Sales.findOneAndDelete({salesman: name}).then(sale => {
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

const edit = (req, res) => {
    console.log("Se ha ejecutado el método de prueba editar de Stock")
    let id = req.params.id;
    let parameters = req.body;
    try{
        let val_salesman = !validator.isEmpty(parameters.salesman) 
            && validator.isLength(parameters.salesman, {min: 3, max:20});
        let val_client = !validator.isEmpty(parameters.client) 
            && validator.isLength(parameters.client, {min: 3, max:20});
        if(!val_salesman || !val_client){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }
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
    create,
    read,
    read_by_id,
    read_by_name,
    del_by_id,
    del_by_name,
    edit
}