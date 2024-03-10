//dependencias
const validator = require("validator");
const Suppliers = require("../models/Suppliers");

const create = (req, res) => {
    const parameters = req.body;
    try{
        const errors = [];
        const isNameValid = !validator.isEmpty(parameters.name) && validator.isLength(parameters.name, {min: 1, max: 15});
        errors.push("Nombre");
        const isAddressValid = !validator.isEmpty(parameters.address) && validator.isLength(parameters.address, {min: 5, max: 40});
        errors.push("Direccion");
        const isTelephoneValid = !validator.isEmpty(parameters.telephone) && validator.isLength(parameters.telephone, {min: 1, max: 20});
        errors.push("Telephone");
        if(!isNameValid || !isAddressValid || !isTelephoneValid){
            throw new Error("No se han completado todos los campos correctamente.");
        }
    }catch(error){
        return res.status(400).json({
            status: "Error",
            mensaje: "Faltan datos por enviar"
        })
    }
    const supplier = new Suppliers(parameters);
    supplier.save()
        .then(savedSupplier => {
            if(!savedSupplier){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha registrado el proveedor"
                });
            }
            return res.status(200).json({
                status: "Success",
                supplier: savedSupplier,
                mensaje: "El proveedor se ha registrado correctamente"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                mensaje: "No se ha registrado el proveedor",
                error: error.message
            });
        });  
}

//Lectura general
const read = (req, res) =>{
    console.log("Se ha ejecutado el método de prueba read de Suppliers")
    let consulta = Suppliers.find({}).then( supplier => {
        if(!supplier){
            return res.status(400).json({
                status: "error",
                mensaje: "No se encontró el proveedor"
            })
        }

        return res.status(200).json({
            status: "Success",
            supplier,
            mensaje: "Proveedor encontrado correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "Error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        })
    })
    return consulta
}


//Búsqueda según su id
const read_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba obtener proveedor de Suppliers")
    let id = req.params.id;
    Suppliers.findById({_id:id}).then( supplier => {
        if(!supplier){
            return res.status(404).json({
                status: "Error",
                mensaje: "No se encontró el proveedor."
            });
        }
        return res.status(200).json({
            status: "Success",
            supplier,
            mensaje: "Venta encontrado correctamente"
        });
    })
    .catch(error => {
        return res.status(500).json({
            status: "Error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Búsqueda según su nombre
const read_by_name = (req, res) => {
    let name = req.params.supplier;
    Suppliers.findOne({supplier: name}).then(supp => {
        if(!supp){
            return res.status(404).json({
                status:"Error",
                mensaje: "No se ha encontrado el proveedor"
            });
        }
        return res.status(200).json({
            status: "Success",
            supp,
            mensaje: "Se ha encontrado el proveedor correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

//Delete
const del_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de Suppliers")
    let id = req.params.id;
    Suppliers.findOneAndDelete({_id: id}).then( deletedSupplier => {
        if(!deletedSupplier){
            return res.status(404).json({
                status: "Error",
                mensaje: "No se ha encontrado el proveedor"
            });
        }
        return res.status(200).json({
            status: "Success",
            supp: deletedSupplier,
            mensaje: "Proveedor eliminado correctamente"
        });
    }).catch( error => {
        return res.status(500).json({
            status: "Error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const edit_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba editar de Suppliers")
    let id = req.params.id;
    let parameters = req.body;
    try{
        const isNameValid = !validator.isEmpty(parameters.name) && validator.isLength(parameters.name, {min: 1, max: 15});
        const isAddressValid = !validator.isEmpty(parameters.address) && validator.isLength(parameters.address, {min: 5, max: 40});
        const isTelephoneValid = !validator.isEmpty(parameters.telephone) && validator.isLength(parameters.telephone, {min: 1, max: 20});
        if(!isNameValid || !isAddressValid || !isTelephoneValid){
            throw new Error("No se han completado todos los campos correctamente.");
        }
    }catch(error){
        return res.status(400).json({
            status: "Error",
            mensaje: "Faltan datos por enviar"
        })
    }
    Suppliers.findOneAndUpdate({_id: id}, parameters).then( editedSupplier => {
        if(!editedSupplier){
            return res.status(404).json({
                status: "Error",
                mensaje: "No se ha encontrado el proveedor"
            });
        }
        return res.status(200).json({
            status: "Success",
            supp: editedSupplier,
            mensaje: "Proveedor editado correctamente"
        });
    }).catch( error => {
        return res.status(500).json({
            status: "Error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}



module.exports = {
    //stock_prueba,
    create,
    read,
    read_by_id,
    read_by_name,
    del_by_id,
    edit_by_id
}