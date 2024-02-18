//Creación de métodos
const controller = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador"
    })
}

const stock_prueba = (req, res) => {

    console.log("Se ha ejecutado el método de prueba de stock");
    return res.status(200).json([{
        id: "ajjfhjr211",
        nombre: "Cepillo",
        categoria: ["Limpieza", "Salud"]
    },
    {
        nombre: "ProbandoJson",
        id: "jtyuj67tyjkytukjyukj"
    }]);
}

module.exports = {
    controller,
    stock_prueba
}