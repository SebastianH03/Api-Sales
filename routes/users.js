//Dependencias
const express = require("express");
const router = express.Router();

// Controlador de Stock
const UsersController = require("../controllers/users");


//RUTAS DE CRUD

//guardar
router.post("", UsersController.create);

//leer
router.get("", UsersController.read);

//Borra
router.delete("/:id", UsersController.del_by_id);

//Editar
router.put("/:id", UsersController.edit_by_id);

module.exports = router;