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
app.use(express.json());

// Crear rutas

// Crear servidor y escuchar peticiones http
app.listen(puerto, ()=> {
    console.log("Servidor corriendo en el puerto "+puerto);
})