var mongoose = require("mongoose");

var dashboardController = {};

dashboardController.getDashboard = function (req, res) {
  res.render("../views/dashboard/dashboard");
};

module.exports = dashboardController;