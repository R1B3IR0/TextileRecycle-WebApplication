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
      console.log(points);
      res.render("../views/points/pointList", { points: points });
    }
  });
};

// Formulário para editar a configuração de pontos
pointController.formEdit = function (req, res) {
  Point.findOne({_id: req.params.id}).exec(function (err, point) {
    if (err) {
      console.log("Erro ao ler a configuração de pontos");
      res.redirect("/error");
    } else {
      res.render("../views/points/pointEditList", { point: point });
    }
  });
};

// Criação automática de uma configuração de pontos com valores predefinidos
pointController.formCreate = function (req, res) {
  // Valores predefinidos para a configuração de pontos
  var defaultPointValues = {
    newWithTag: 5,
    newWithoutTag: 3,
    veryGood: 7,
    good: 5,
    satisfactory: 3,
    quantity: 10,
    donationMoney: 20
  };

  // Cria uma nova configuração de pontos com os valores predefinidos
  var defaultPoint = new Point(defaultPointValues);

  // Salva a configuração de pontos predefinida
  defaultPoint.save(function (err) {
    if (err) {
      console.error("Erro ao criar configuração de pontos predefinida:", err);
      res.redirect("/error");
    } else {
      console.log("Configuração de pontos predefinida criada com sucesso");
      res.redirect("/points"); // Redireciona para a lista de configurações de pontos
    }
  });
};

// Edição da configuração de pontos
pointController.edit = function (req, res) {
  // Verifica se o ID está presente no corpo da solicitação
  if (!req.body.id) {
    console.log("ID do ponto não encontrado no corpo da solicitação.");
    return res.redirect("/error");
  }

  // Obtém o ID do ponto a partir do corpo da solicitação
  var pointId = req.body.id;

  Point.findByIdAndUpdate(pointId, req.body, function (err, point) {
    if (err) {
      console.log("Erro ao editar a configuração de pontos:", err);
      return res.redirect("/error");
    } else {
      console.log("Configuração de pontos editada com sucesso:", point);
      return res.redirect("/points");
    }
  });
};
  
module.exports = pointController;