var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController.js");
var authentication = require("../controllers/authController.js");

router.get("/", authentication.verifyLoginUser, dashboardController.getDashboard);

module.exports = router;