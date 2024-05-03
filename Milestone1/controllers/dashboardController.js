var mongoose = require("mongoose");

var dashboardController = {};

/*
dashboardController.getDashboard = function (req, res) {
  res.render("../views/dashboard/dashboard");
};
*/

//dashboard temporary
dashboardController.getDashboard = function (req, res) {
  res.render("../views/dashboard/dashboard_temp");
};

module.exports = dashboardController;