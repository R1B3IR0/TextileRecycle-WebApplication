let mongoose = require("mongoose");
let Donator = require("../models/donator");
let donatorController = {};

// show all donators
donatorController.showAll = function(req, res) {
  Donator.find({}).exec(function(err, dbdonators){
    if(err){
      console.log('Erro a ler');
      res.redirect('/error')
    } else {
      console.log(dbdonators);
      res.render('../views/donators/donatorList', {donators: dbdonators});
    }
  });
};

// show 1 donator by id
donatorController.show = function(req, res) {
  Donator.findOne({_id: req.params.id}).exec(function(err, dbdonator){
    if(err){
      console.log('Erro a ler');
      res.redirect('/error')
    } else {
      res.render('../views/donators/donatorViewDetails', {donator: dbdonator});
    }
  });
};

// form to create 1 donator
donatorController.formCreate = function (req, res) {
  res.render("../views/donators/createForm");
};

// create 1 donator as a response to a post in a form
donatorController.create = function (req, res) {

  var donator = new Donator(req.body);

  console.log("Attempting to create donator:", donator);
  donator.save(function (err) {
    if (err) {
      console.error("Error saving donator:", err);
      res.render("../views/donators/createForm");
    } else {
      console.log("Successfully created an donator.");
      res.redirect("/donators");
    }
  });
};

// show form to edit 1 donator
donatorController.formEdit = function (req, res) {
  Donator.findOne({_id: req.params.id}).exec(function(err, dbdonator){
    if(err){
      console.log('Erro a ler');
      res.redirect('/error')
    } else {
      res.render('../views/donators/donatorEditDetails', {donator: dbdonator});
    }
  });
};

// edit 1 donator as a response to a post in a form
donatorController.edit = function (req, res) {
  Donator.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, email: req.body.email, contact: req.body.contact, address: req.body.address, points: req.body.points}},
      { new: true },
      function (err, dbdonator) {
    if (err) {
      console.log('Erro a editar');
      res.redirect('/error');
    }
    res.redirect('/donators');
  });
};

// delete 1 donator
donatorController.delete = function (req, res) {
  Donator.remove({_id: req.params.id}, function(err){
    if(err){
      console.log('Erro a apagar');
      res.redirect('/error');
    }
    res.redirect('/donators');
  });
};

module.exports = donatorController;












