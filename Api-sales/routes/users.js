//Dependencias
const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");


//guardar
router.post("", UsersController.create);

//leer
router.get("", UsersController.read);
router.get("/:id", UsersController.read_by_id);

//Borra
router.delete("/:id", UsersController.del_by_id);

//Editar
router.put("/:id", UsersController.edit_by_id);

//generar reporte por nombre
router.get("/name/:name", UsersController.generateReport_by_name);

module.exports = router;