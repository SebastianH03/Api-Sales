//dependencias
const History = require("../models/History");

const create = (req, res) => {
    const parameters = req.body;
    const history = new History(parameters);
    history.save()
        .then(savedHistory => {
            return res.status(200).json({
                status: "Success",
                hist: savedHistory,
                mensaje: "El historial se ha actualizado correctamente"
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
    console.log("Se ha ejecutado el método de prueba read de History")
    let consulta = History.find({}).then( hist => {
        if(!hist){
            return res.status(400).json({
                status: "Error",
                mensaje: "Todavia no hay ningun registro en el historial"
            })
        }
        return res.status(200).json({
            status: "Success",
            hist,
            mensaje: "Historial encontrado correctamente"
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

module.exports = {
    create,
    read
}