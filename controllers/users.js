//dependencias
const validator = require("validator");
const Users = require("../models/Users");



const create = (req, res) => {
    
    // Recoger parámetros por post a guardar
    const parametros = req.body;

    // Validar los datos
    try{

        //Que no estén vacíos
        let validar_nombre = !validator.isEmpty(parametros.nombre);
        let validar_password = !validator.isEmpty(parametros.password) 
            //&& validator.isLength(parametros.product, {min: 3, max:20}); //comprueba el tamaño
        let validar_rol = !validator.isEmpty(parametros.rol); 
            

        if( !validar_nombre || !validar_password || ! validar_rol){
            throw new Error("No se ha completado todos los campos");
        }

    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar" + error
        })
    }
    // Crear y asignar el objeto a guardar
    const user = new Users(parametros);

    // Guardar el artículo en la base de datos
    user.save()
        .then(usuarioGuardado => {
            if(!usuarioGuardado){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el usuario"
                });
            }

            //Devolver resultado
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
    let consulta = Users.find({}).then( producto => {
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

const del = (req, res) => {
    let id = req.params.id;
    Users.findOneAndDelete({_id:id}).then( usuarioBorrado => {
        if(!usuarioBorrado){
            return res.status(404).json({
                status: "Error",
                mensaje: "No se encontro el Usuario"
            });
        }

        return res.status(200).json({
            status: "Succes",
            usuario: usuarioBorrado,
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

const edit = (req, resp) => {
    let id = req.params.id;
    let parametros = req.body;

    // Validar los datos
    try{

        //Que no estén vacíos
        let validar_nombre = !validator.isEmpty(parametros.nombre);
        let validar_password = !validator.isEmpty(parametros.password) 
            //&& validator.isLength(parametros.product, {min: 3, max:20}); //comprueba el tamaño
        let validar_rol = !validator.isEmpty(parametros.rol); 
            

        if( !validar_nombre || !validar_password || ! validar_rol){
            throw new Error("No se ha completado todos los campos");
        }

    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar" + error
        });
    }

    Users.findOneAndUpdate({_id:id}, parametros).then( usuario => {
        if(!usuario){
            return resp.status(404).json({
                status: "Error",
                mensaje: "No se ha encontrado el producto"
            });
        }

        return resp.status(200).json({
            status: "Succes",
            usuario: usuario,
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
    del,
    edit
}