var mongoose = require("mongoose");
var Donation = require("../models/donation"); // Importa o modelo Donation

var donationController = {};

// Mostra todas as doações
donationController.showAll = function(req, res) {
  Donation.find({}).exec(function(err, donations){
    if(err){
      console.log('Erro ao ler as doações');
      res.redirect('/error');
    } else {
      console.log(donations);
      res.render('../views/donations/donationList', {donations: donations});
    }
  });
};

// Mostra uma doação pelo id
donationController.show = function(req, res) {
  Donation.findOne({_id: req.params.id}).exec(function(err, donation){
    if(err){
      console.log('Erro ao ler a doação');
      res.redirect('/error');
    } else {
      res.render('../views/donations/donationViewDetails', {donation: donation});
    }
  });
};

// Formulário para criar uma doação
donationController.formCreate = function (req, res) {
  res.render("../views/donations/createForm");
};

// Cria uma doação em resposta a um post em um formulário
donationController.create = function (req, res) {
    // Log the request body to check its contents
    console.log("Request body:", req.body);

    // Create a new donation instance with the data from the form
    var donationData = req.body;

    // Omit typeOfClothing for donations of type 'Dinheiro'
    if (donationData.typeOfDonation === 'Dinheiro') {
        console.log("Donation type is Dinheiro. Omitting typeOfClothing.");
        delete donationData.typeOfClothing;
    }
    // Delete amount for donations of type 'Doação Têxtil'
    if (donationData.typeOfDonation === 'Doação Têxtil') {
        console.log("Donation type is Doação Têxtil. Deleting amount.");
        delete donationData.amount;
        // Add typeOfClothing and state fields
        donationData.typeOfClothing = req.body['typeOfClothing.category'];
        donationData.state = req.body['typeOfClothing.state'];
    }


    var donation = new Donation(donationData);

    console.log("Attempting to create donation:", donation);
    donation.save(function(err) {
        if (err) {
            console.error("Error saving donation:", err);
            res.render("../views/donations/createForm");
        } else {
            console.log("Successfully created a donation.");
            res.redirect("/donations");
        }
    });
};

// Formulário para editar uma doação
donationController.formEdit = function (req, res) {
  Donation.findOne({ _id: req.params.id }).exec(function (err, donation) {
    if (err) {
      console.log("Erro ao ler a doação");
      res.redirect("/error");
    } else {
      res.render("../views/donations/donationEditDetails", { donation: donation });
    }
  });
};

// Atualiza uma doação em resposta a um post em um formulário de edição
donationController.edit = function (req, res) {
  Donation.findByIdAndUpdate(req.body._id, req.body, function(err, donation) {
    if (err) {
      console.log("Erro ao gravar");
      res.redirect("/error");
    } else {
      console.log("Donation updated!");
      res.redirect("/donations/show/" + req.body._id);
    }
  });
};

// Deleta uma doação
donationController.delete = function (req, res) {
  Donation.remove({ _id: req.params.id}).exec((err)=>{
    if (err) {
      console.log("Erro ao apagar");
      res.redirect("/error");
    } else {
      console.log("Donation deleted!");
      res.redirect("/donations");
    }
  });
};

module.exports = donationController;
