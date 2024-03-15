//dependencias
const validator = require("validator");
const Customer = require("../models/Customer");



const create = (req, res) => {
    const params = req.body;
    try{
        let validate_name = !validator.isEmpty(params.name);
        let validate_id = !validator.isEmpty(params.ID) 
        let validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email); 
        if( !validate_name || !validate_id || ! validate_email){
            throw new Error("No se ha completado todos los campos o algún campo es invalido");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }
    const customer = new Customer(params);
    customer.save()
        .then(savedcustomer => {
            if(!savedcustomer){
                return res.status(400).json({
                    status: "error",
                    message: "No se ha guardado el cliente"
                });
            }
            return res.status(200).json({
                status: "Success",
                customer: savedcustomer,
                message: "Cliente guardado correctamente"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "No se ha guardado el cliente",
                error: error.message
            });
        });  
}

const read = (req, res) =>{
    let query = Customer.find({}).then( client => {
        if(!client){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el cliente"
            })
        }
        return res.status(200).json({
            status: "Success",
            client,
            message: "Cliente encontrado correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        })
    })
    return query
}


const read_by_id = (req, res) =>{
    let id = req.params.id;
    let query = Customer.findById({_id:id}).then( client => {
        if(!client){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el cliente"
            })
        }
        return res.status(200).json({
            status: "Success",
            client,
            message: "Cliente encontrado correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        })
    })
    return query
}

const del_by_id = (req, res) => {
    let id = req.params.id;
    Customer.findOneAndDelete({_id:id}).then( deletedCustomer => {
        if(!deletedCustomer){
            return res.status(404).json({
                status: "Error",
                message: "No se encontro el Cliente"
            });
        }

        return res.status(200).json({
            status: "Succes",
            customer: deletedCustomer,
            message: "Cliente borrado correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const edit_by_id = (req, resp) => {
    let id = req.params.id;
    let params = req.body;
    try{
        let validate_name = !validator.isEmpty(params.name);
        let validate_id = !validator.isEmpty(params.ID) 
        let validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email); 
        if( !validate_name || !validate_id || ! validate_email){
            throw new Error("No se ha completado todos los campos o algún campo es invalido");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }

    Customer.findOneAndUpdate({_id:id}, params).then( editCustomer => {
        if(!editCustomer){
            return resp.status(404).json({
                status: "Error",
                message: "No se ha encontrado el Cliente"
            });
        }

        return resp.status(200).json({
            status: "Succes",
            customer: editCustomer,
            message: "Cliente editado correctamente"
        });

    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })

    

}


module.exports = {
    create,
    read,
    del_by_id,
    edit_by_id,
    read_by_id
}