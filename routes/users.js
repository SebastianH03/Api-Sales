//Dependencias
const express = require("express");
const router = express.Router();

// Controlador de Stock
const UsersController = require("../controllers/users");


//RUTAS DE CRUD

//guardar
router.post("/crear", UsersController.create);

//leer
router.get("/leer", UsersController.read);

//Borra
router.delete("/borrar/:id", UsersController.del);

//Editar
router.put("/editar/:id", UsersController.edit);

module.exports = router;