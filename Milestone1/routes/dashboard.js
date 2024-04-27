var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController.js");

router.get("/", dashboardController.getDashboard);

module.exports = router;