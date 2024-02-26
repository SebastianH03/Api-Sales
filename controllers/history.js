//dependencias
const History = require("../models/History");

//Lectura general
const read = async (req, res) => {
    try {
        const history = await History.find(); // Recupera todos los documentos de la colección de historial
        res.json(history); // Envía los documentos como respuesta
    } catch (error) {
        console.error('Error al recuperar el historial:', error);
        res.status(500).send('Hubo un error al recuperar el historial');
    }
};

module.exports = {
    read
};