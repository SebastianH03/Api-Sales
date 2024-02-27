//dependencias
const validator = require("validator");
const Users = require("../models/Users");



const create = (req, res) => {
    const parametros = req.body;
    try{
        let validar_nombre = !validator.isEmpty(parametros.name);
        let validar_password = !validator.isEmpty(parametros.password) 
        let validar_rol = !validator.isEmpty(parametros.role); 
        if( !validar_nombre || !validar_password || ! validar_rol){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar" + error
        })
    }
    const user = new Users(parametros);
    user.save()
        .then(usuarioGuardado => {
            if(!usuarioGuardado){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el usuario"
                });
            }
            return res.status(200).json({
                status: "Success",
                user: usuarioGuardado,
                mensaje: "usuario guardado correctamente"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                mensaje: "No se ha guardado el usuario",
                error: error.message
            });
        });  
}

const read = (req, res) =>{
    let consulta = Users.find({}).then( product => {
        if(!product){
            return res.status(400).json({
                status: "error",
                mensaje: "No se encontró el usuario"
            })
        }

        return res.status(200).json({
            status: "Success",
            product,
            mensaje: "Usuario encontrado correctamente"
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

const del_by_id = (req, res) => {
    let id = req.params.id;
    Users.findOneAndDelete({_id:id}).then( deletedUser => {
        if(!deletedUser){
            return res.status(404).json({
                status: "Error",
                mensaje: "No se encontro el Usuario"
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
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const edit_by_id = (req, resp) => {
    let id = req.params.id;
    let parametros = req.body;
    try{
        let validar_nombre = !validator.isEmpty(parametros.name);
        let validar_password = !validator.isEmpty(parametros.password) 
        let validar_rol = !validator.isEmpty(parametros.role); 
            

        if( !validar_nombre || !validar_password || ! validar_rol){
            throw new Error("No se ha completado todos los campos");
        }

    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar" + error
        });
    }

    Users.findOneAndUpdate({_id:id}, parametros).then( editUser => {
        if(!editUser){
            return resp.status(404).json({
                status: "Error",
                mensaje: "No se ha encontrado el producto"
            });
        }

        return resp.status(200).json({
            status: "Succes",
            user: editUser,
            mensaje: "Usuario editado correctamente"
        });

    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            mensaje: "Ha ocurrido un error",
            error: error.message
        });
    })

    

}


module.exports = {
    create,
    read,
    del_by_id,
    edit_by_id
}