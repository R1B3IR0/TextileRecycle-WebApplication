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

// Formulário para criar uma configuração de pontos
pointController.formCreate = async function (req, res) {
  try {
    res.render("../views/points/createForm");
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
};

pointController.create = function (req, res) {
  // Log do corpo da requisição para verificar seu conteúdo
  console.log("Corpo da requisição:", req.body);

  // Cria uma nova instância de Point com os dados do formulário
  var newPoint = new Point({
    newWithTag: req.body.newWithTag,
    newWithoutTag: req.body.newWithoutTag,
    veryGood: req.body.veryGood,
    good: req.body.good,
    satisfactory: req.body.satisfactory,
    quantity: req.body.quantity,
    donationMoney: req.body.donationMoney,
  });

  newPoint.save(function (err) {
    if (err) {
      console.log(err);
      res.redirect("/error");
    } else {
      console.log("Configuração de pontos criada com sucesso");
      res.redirect("/points"); // Redireciona para a lista de doações
    }
  });
};

pointController.formEdit = function (req, res) {
  Point.findOne({ _id: req.params.id }).exec(function (err, point) {
    if (err) {
      console.log("Erro ao ler a configuração de pontos");
      res.redirect("/error");
    } else {
      res.render("../views/points/pointEditList", { point: point });
    }
  });
};

pointController.edit = function (req, res) {
    Point.findByIdAndUpdate(req.body._id, req.body, function(err, point) {
        if (err) {
            console.log("Erro ao gravar");
            res.redirect("/error");
        } else {
            console.log("Configuração de pontos atualizada!");
            res.redirect("/points");
        }
        });
}

  

module.exports = pointController;