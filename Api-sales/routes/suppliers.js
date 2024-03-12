const express = require("express");
const router = express.Router();
const SuppliersController = require("../controllers/suppliers");


//Guardar
router.post("/", SuppliersController.create);

//Leer
router.get("", SuppliersController.read);
router.get("/:id", SuppliersController.read_by_id);
router.get("/name/:name", SuppliersController.read_by_name);

//Borrar
router.delete("/:id", SuppliersController.del_by_id);

//Editar
router.put("/:id", SuppliersController.edit_by_id);


module.exports = router;