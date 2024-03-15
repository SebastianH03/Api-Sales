//dependencias
const validator = require("validator");
const Users = require("../models/Users");
const { generateUserReport } = require("../services/pdfUserReport");


const create = (req, res) => {
    const params = req.body;
    try{
        let name_validator = !validator.isEmpty(params.name);
        let password_validator = !validator.isEmpty(params.password); 
        let role_validator = !validator.isEmpty(params.role);
        let email_validator = !validator.isEmpty(params.email) && validator.isEmail(params.email); 
        if( !name_validator || !password_validator || ! role_validator || !email_validator){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }
    const user = new Users(params);
    user.save()
        .then(savedUser => {
            if(!savedUser){
                return res.status(400).json({
                    status: "error",
                    message: "No se ha guardado el usuario"
                });
            }
            return res.status(200).json({
                status: "Success",
                user: savedUser,
                message: "usuario guardado correctamente"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "No se ha guardado el usuario",
                error: error.message
            });
        });  
}

const read = (req, res) =>{
    let query = Users.find({}).then( user => {
        if(!user){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el usuario"
            })
        }

        return res.status(200).json({
            status: "Success",
            user,
            message: "Usuario encontrado correctamente"
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
    let query = Users.find({_id:id}).then( user => {
        if(!user){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el usuario"
            })
        }

        return res.status(200).json({
            status: "Success",
            user,
            message: "Usuario encontrado correctamente"
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
    Users.findOneAndDelete({_id:id}).then( deletedUser => {
        if(!deletedUser){
            return res.status(404).json({
                status: "Error",
                message: "No se encontro el Usuario"
            });
        }

        return res.status(200).json({
            status: "Succes",
            user: deletedUser,
            message: "Usuario borrado correctamente"
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
    const params = req.body;
    try{
        let name_validator = !validator.isEmpty(params.name);
        let password_validator = !validator.isEmpty(params.password); 
        let role_validator = !validator.isEmpty(params.role);
        let email_validator = !validator.isEmpty(params.email) && validator.isEmail(params.email); 
        if( !name_validator || !password_validator || ! role_validator || !email_validator){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }
    Users.findOneAndUpdate({_id:id}, params).then( editedUser => {
        if(!editedUser){
            return resp.status(404).json({
                status: "Error",
                message: "No se ha encontrado el producto"
            });
        }

        return resp.status(200).json({
            status: "Succes",
            user: editedUser,
            message: "Usuario editado correctamente"
        });

    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const generateReport_by_name = async (req, res) => {
    const {name} = req.params;
    try{
        const pdfContent = await generateUserReport(name);
        //Indicar que es un archivo de respuesta
        res.setHeader("Content-disposition", "attachment; filename=user_report.pdf");
        res.setHeader("Content-type", "application/pdf");
        pdfContent.pipe(res);
    }catch(error){
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}




module.exports = {
    create,
    read,
    read_by_id,
    del_by_id,
    edit_by_id,
    generateReport_by_name
}