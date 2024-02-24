//Dependencias
const express = require("express");
const router = express.Router();

// Controlador de Stock
const StockController = require("../controllers/stock");

// Rutas de prueba
router.get("/ruta-stock", StockController.controller);
router.get("/stock-prueba", StockController.stock_prueba);

//RUTAS DE CRUD

//guardar
router.post("/crear", StockController.create);

//leer
router.get("/leer", StockController.read);

module.exports = router;