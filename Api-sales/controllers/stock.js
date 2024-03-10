//dependencias
const validator = require("validator");
const Stock = require("../models/Stock");
const Suppliers = require("../models/Suppliers");


//Crear
const create = async (req, res) => {
    const params = req.body;
    try{
        if(!params.quantity || !validator.isNumeric(params.quantity) || parseFloat(params.quantity) <= 0){
            throw new Error("La cantidad del producto no es válida");
        }
        if(!params.product || !params.product.name || !params.product.price){
            throw new Error("Datos del producto son invalidos");
        }
        if(!validator.isLength(params.product.name, {min:3, max: 35})){
            throw new Error("La longitud del producto no es valida (debe tener entre 3 a 35 caracteres");
        }
        const provider = await Suppliers.findById(params.product.provider);
        if (!provider){
            throw new Error("El proveedor proporcionado no es valido");
        }
        const stock = new Stock({
            product:{
                name: params.product.name,
                price: params.product.price,
                provider: params.product.provider,
                tags: params.product.tags,
                providerName: provider.name
            },
            quantity: params.quantity
        });
        stock.save()
            .then(savedStock => {
                if(!savedStock){
                    return res.status(400).json({
                        status: "error",
                        message: "No se ha guardado el producto"
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    stock: savedStock,
                    message: "Articulo guardado correctamente"
                });
            })
            .catch(error => {
                return res.status(500).json({
                    status: "error",
                    message: "No se ha guardado el producto",
                    error: error.message
                });
            });  
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }
}

//Lectura general

const read = (req, res) =>{
    console.log("Se ha ejecutado el método de prueba read de stock")
    const order = req.query.orden || 'asc';
    const sorting = {quantity: order === 'desc' ? -1: 1};
    let query = Stock.find({}).sort(sorting).then( stock => {
        if(!stock){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el producto"
            })
        }
        return res.status(200).json({
            status: "Success",
            stock,
            message: "Producto encontrado correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "ha ocurrido un error",
            error: error.message
        })
    })
    return query
}


//Lectura por ID

const read_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba obtener artículo de stock")
    let id = req.params.id;
    Stock.findById({_id:id}).then( stock => {
        if(!stock){
            return res.status(404).json({
                status: "error",
                message: "No se encontró el producto"
            });
        }
        return res.status(200).json({
            status: "Success",
            stock,
            message: "Producto encontrado correctamente"
        });
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "ha ocurrido un error",
            error: error.message
        });
    })
}

//Lectura por nombre
const read_by_name = (req, res) => {
    let name = req.params.name;
    Stock.findOne({product: name}).then(stock => {
        if(!stock){
            return res.status(404).json({
                status:"error",
                message: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "Success",
            stock,
            message: "Encontrado correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Borrar por ID
const del_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de stock")
    let id = req.params.id;
    Stock.findOneAndDelete({_id: id}).then( stock => {
        if(!stock){
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "success",
            stock: stock,
            message: "Objeto eliminado correctamente"
        });
    }).catch( error => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Borrar por nombre
const del_by_name = (req, res) => {
    let name = req.params.name;
    Stock.findOneAndDelete({product: name}).then(stock => {
        if(!stock){
            return res.status(404).json({
                status:"error",
                message: "No se ha encontrado el producto"
            });
        }
        return res.status(200).json({
            status: "Success",
            stock,
            message: "Producto eliminado correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Editar

const edit = async (req, res) => {
    console.log("Se ha ejecutado el método de prueba editar de Stock")
    let id = req.params.id;
    const params = req.body;
    try{
        if(!params.quantity || !validator.isNumeric(params.quantity) || parseFloat(params.quantity) <= 0){
            throw new Error("La cantidad del producto no es válida");
        }
        if(!params.product || !params.product.name || !params.product.price){
            throw new Error("Datos del producto son invalidos");
        }
        if(!validator.isLength(params.product.name, {min:3, max: 35})){
            throw new Error("La longitud del producto no es valida (debe tener entre 3 a 35 caracteres");
        }
        const provider = await Suppliers.findById(params.product.provider);
        if (!provider){
            throw new Error("El proveedor proporcionado no es valido");
        }
        const stock = new Stock({
            product:{
                name: params.product.name,
                price: params.product.price,
                provider: params.product.provider,
                tags: params.product.tags,
                providerName: provider.name
            },
            quantity: params.quantity
        });
        Stock.findOneAndUpdate({_id: id}, params).then( stock => {
            if(!stock){
                return res.status(404).json({
                    status: "error",
                    message: "No se ha encontrado el producto"
                });
            }
            return res.status(200).json({
                status: "success",
                stock: stock,
                message: "Objeto editado correctamente"
            });
        }) 
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }
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