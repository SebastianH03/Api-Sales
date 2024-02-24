//Dependencias
const express = require("express");
const router = express.Router();

// Controlador de Stock
const StockController = require("../controllers/stock");

// Rutas de prueba
router.get("/ruta-stock", StockController.controller);
//router.get("/stock-prueba", StockController.stock_prueba);

//RUTAS DE CRUD

//guardar
router.post("/crear", StockController.create);

//leer
router.get("/leer", StockController.read);

router.get("/producto/:id", StockController.uno);

router.get("/name/:nombre", StockController.name);

//Borrar

router.delete("/borrar/:id", StockController.del);
router.delete("/nombre/:nombre", StockController.delByName);

//editar

module.exports = router;