//Dependencias
const express = require("express");
const router = express.Router();

const StockController = require("../controllers/stock");

//guardar
router.post("", StockController.create);

//leer
router.get("", StockController.read);
router.get("/:id", StockController.read_by_id);
router.get("/name/:name", StockController.read_by_name);

//Borrar
router.delete("/:id", StockController.del_by_id);
router.delete("/name/:name", StockController.del_by_name);

//editar
router.put("/:id", StockController.edit);


module.exports = router;