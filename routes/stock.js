//Dependencias
const express = require("express");
const router = express.Router();

// Controlador de Stock
const StockController = require("../controllers/stock");

//RUTAS DE CRUD

//guardar
router.post("", StockController.create);

//leer
router.get("", StockController.read);

router.get("/:id", StockController.uno);

router.get("/name/:nombre", StockController.name);

//Borrar

router.delete("/:id", StockController.del);
router.delete("/name/:nombre", StockController.delByName);

//editar
router.put("/:id", StockController.editar);


module.exports = router;