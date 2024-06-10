let mongoose = require("mongoose");
let Donator = require("../models/donator");

let donatorRESTController = {};

// Mostra todos os doadores
donatorRESTController.showAll = async function(req, res, next) {
  try {
    let donators = await Donator.find({}).exec();
    console.log(donators);
    res.json(donators);
  } catch (err) {
    console.log('Erro ao ler os doadores');
    next(err);
  }
};

module.exports = donatorRESTController;