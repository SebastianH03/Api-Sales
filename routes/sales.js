//Dependencias
const express = require("express");
const router = express.Router();

// Controlador de Stock
const SalesController = require("../controllers/sales");

//RUTAS DE CRUD

//guardar
router.post("", SalesController.create);

//leer
router.get("", SalesController.read);

router.get("/:id", SalesController.uno);

router.get("/name/:nombre", SalesController.name);

//Borrar

router.delete("/:id", SalesController.del);
router.delete("/name/:nombre", SalesController.delByName);

//editar
router.put("/:id", SalesController.editar);


module.exports = router;