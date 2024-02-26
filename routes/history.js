const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/history");

//Guardar
router.post("/crear", HistoryController.create);

//Leer
router.get("/leer", HistoryController.read);



module.exports = router;