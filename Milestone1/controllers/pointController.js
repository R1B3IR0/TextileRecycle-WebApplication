var mongoose = require("mongoose");
var Point = require("../models/point");

var pointController = {};

// Mostra todas as configurações de pontos
pointController.showAll = function (req, res) {
  Point.find({}).exec(function (err, points) {
    if (err) {
      console.log("Erro ao ler as configurações de pontos");
      res.redirect("/error");
    } else {
      res.render("../views/points/pointList", { points: points });
    }
  });
};

// Formulário para editar a configuração de pontos
pointController.formEdit = function (req, res) {
  Point.findOne({_id: req.params.id}).exec(function (err, point) {
    if (err) {
      res.redirect("/error");
    } else {
      res.render("../views/points/pointEditList", { point: point });
    }
  });
};

// Criação automática de uma configuração de pontos com valores predefinidos
pointController.formCreate = function (req, res) {
  var defaultPointValues = {
    newWithTag: 5,
    newWithoutTag: 4,
    veryGood: 3,
    good: 2,
    satisfactory: 1,
    quantity: 5,
    donationMoney: 20
  };
  var defaultPoint = new Point(defaultPointValues);
  defaultPoint.save(function (err) {
    if (err) {
      res.redirect("/error");
    } else {
      res.redirect("/points");
    }
  });
};

// Edição da configuração de pontos
pointController.edit = function (req, res) {
  if (!req.body.id) {
    return res.redirect("/error");
  }
  var pointId = req.body.id;
  Point.findByIdAndUpdate(pointId, req.body, function (err) {
    if (err) {
      return res.redirect("/error");
    } else {
      return res.redirect("/points");
    }
  });
};

module.exports = pointController;
