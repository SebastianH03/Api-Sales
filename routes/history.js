const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/history");

//Leer
router.get("/leer", HistoryController.read);



module.exports = router;