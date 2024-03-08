//Dependencias
const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/customer");


//guardar
router.post("", CustomerController.create);

//leer
router.get("", CustomerController.read);

//Borra
router.delete("/:id", CustomerController.del_by_id);

//Editar
router.put("/:id", CustomerController.edit_by_id);

module.exports = router;