const validator = require("validator");
const Sales = require("../models/Sales");
const Stock = require("../models/Stock");
const User = require("../models/Users");
const Customer = require("../models/Customer");


const create = async (req, res) => {
    const params = req.body;    
    try{
        if(!Array.isArray(params.salesInfo) || params.salesInfo.length === 0){
            throw new Error("Faltan datos de la información de la venta");
        }
        console.log(params.salesInfo);
        for(const sale of params.salesInfo){
            const stock = await Stock.findOne({'product.name': sale.product_name});
            if (!stock){
                throw new Error("El producto escrito no existe");
            }
            sale.product_id = stock.product._id;
            sale.stock_id = stock._id;
            if(!sale.product_name || !sale.quantity){
                throw new Error("Cada venta debe contar con nombre del producto y Cantidad");
            }
        }
        const salesmanExist = await User.exists({name: params.salesman});
        const clientExist = await Customer.exists({name: params.client});

        if(!salesmanExist || !clientExist){
            throw new Error("El vendedor o cliente no existe");
        }

        const sales = await Sales.create(params);
        return res.status(200).json({
            status: "Success",
            sales: sales,
            message: "Venta guardada correctamente"
        });
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    } 
}

//Lectura general
const read = (req, res) =>{
    console.log("Se ha ejecutado el método de prueba read de sales");
    let query = Sales.find({}).then( sale => {
        if(!sale){
            return res.status(400).json({
                status: "error",
                message: "No se encontró la venta"
            })
        }

        return res.status(200).json({
            status: "Success",
            sale,
            message: "Venta encontrada correctamente"
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
    console.log("Se ha ejecutado el método de prueba obtener artículo de sales")
    let id = req.params.id;
    Sales.findById({_id:id}).then( sale => {
        if(!sale){
            return res.status(404).json({
                status: "error",
                message: "No se encontró la venta"
            });
        }
        return res.status(200).json({
            status: "Success",
            sale,
            message: "Venta encontrado correctamente"
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

//Delete
const del_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de sales")
    let id = req.params.id;
    Sales.findOneAndDelete({_id: id}).then( deletedSale => {
        if(!deletedSale){
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado la venta"
            });
        }
        return res.status(200).json({
            status: "success",
            sale: deletedSale,
            message: "Venta eliminada correctamente"
        });
    }).catch( error => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const edit = async (req, res) => {
    console.log("Se ha ejecutado el método de prueba editar de Stock")
    let id = req.params.id;
    const params = req.body;    
    try{
        if(!Array.isArray(params.salesInfo) || params.salesInfo.length === 0){
            throw new Error("Faltan datos de la información de la venta");
        }
        console.log(params.salesInfo);
        for(const sale of params.salesInfo){
            const stock = await Stock.findOne({'product.name': sale.product_name});
            if (!stock){
                throw new Error("El producto escrito no existe");
            }
            sale.product_id = stock.product._id;
            sale.stock_id = stock._id;
            if(!sale.product_name || !sale.quantity){
                throw new Error("Cada venta debe contar con nombre del producto y Cantidad");
            }
        }
        const salesmanExist = await User.exists({name: params.salesman});
        const clientExist = await Customer.exists({name: params.client});

        if(!salesmanExist || !clientExist){
            throw new Error("El vendedor o cliente no existe");
        }
        Sales.findOneAndUpdate({_id: id}, params).then( editedSale => {
            if(!editedSale){
                return res.status(404).json({
                    status: "error",
                    message: "No se ha encontrado el producto"
                });
            }
            return res.status(200).json({
                status: "success",
                sale: editedSale,
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
    del_by_id,
    edit
}