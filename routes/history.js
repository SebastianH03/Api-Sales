const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/history");

//Leer
router.get("", HistoryController.read);



module.exports = router;