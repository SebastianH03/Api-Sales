//Dependencias
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Iniciar la base de datos
console.log("App de Node iniciada")

// Conectar la base de datos
connection();

// Crear servidor Node (para escuchar peticiones http y crear rutas) Express es el framework
const app = express();
const puerto = 3900;

// Configurar cors (middleware antes de ejecutar una ruta para evitar problemas de dominio)
app.use(cors());

// Convertir body a objeto js. Parsear los datos a un objeto js.
app.use(express.json()); //Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); //datos que llegan en urlencoded los convierte a json (formularios normales)

// RUTAS
const ruta_stock = require("./routes/stock");
const ruta_Users = require("./routes/users");
// Cargar Rutas

//Ruta de stock
app.use("/stock", ruta_stock);
app.use("/users", ruta_Users);

// Crear rutas (temporal -> de prueba) fuerza bruta
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).json([{
        nombre: "ProbandoJson",
        autor: "Sebastian Hernandez"
    },
    {
        nombre: "ProbandoJson",
        autor: "Arthur Morgan"
    }]); //devolver algo para la peticion, status puede ser el código http que se desea usar (200 -> exito)
}) //req es la request y res es la respuesta de la ruta

app.get("/", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).send(`
        <h1> Funcionando API </h1>
    `); //devolver algo para la peticion, status puede ser el código http que se desea usar (200 -> exito)
}) //req es la request y res es la respuesta de la ruta

// Crear servidor y escuchar peticiones http
app.listen(puerto, ()=> {
    console.log("Servidor corriendo en el puerto "+puerto);
})