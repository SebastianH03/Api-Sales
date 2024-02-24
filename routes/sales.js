//Dependencias
const express = require("express");
const router = express.Router();

// Controlador de Stock
const SalesController = require("../controllers/sales");

//RUTAS DE CRUD

//guardar
router.post("/crear", SalesController.create);

//leer
router.get("/leer", SalesController.read);

router.get("/venta/:id", SalesController.uno);

router.get("/nombre/:nombre", SalesController.name);

//Borrar

router.delete("/borrar/:id", SalesController.del);
router.delete("/nombre/:nombre", SalesController.delByName);

//editar
router.put("/editar/:id", SalesController.editar);


module.exports = router;