//Dependencias
const express = require("express");
const router = express.Router();

const SalesController = require("../controllers/sales");


//guardar
router.post("", SalesController.create);

//leer
router.get("", SalesController.read);
router.get("/:id", SalesController.read_by_id);
router.get("/name/:name", SalesController.read_by_name);

//Borrar
router.delete("/:id", SalesController.del_by_id);
router.delete("/name/:name", SalesController.del_by_name);

//editar
router.put("/:id", SalesController.edit);


module.exports = router;