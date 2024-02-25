const express = require("express");
const router = express.Router();
const SuppliersController = require("../controllers/suppliers");


//Guardar
router.post("/crear", SuppliersController.create);

//Leer
router.get("/leer", SuppliersController.read);
router.get("/leer_id/:id", SuppliersController.read_by_id);
router.get("/leer_name/:nombre", SuppliersController.read_by_name);

//Borrar
router.delete("/borrar/:id", SuppliersController.del_by_id);
router.delete("/nombre/:nombre", SuppliersController.del_by_name);

//Editar
router.put("/editar/:id", SuppliersController.edit_by_id);


module.exports = router;