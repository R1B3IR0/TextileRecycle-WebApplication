var Donation = require("../models/donation"); // Importa o modelo Donation
var Donator = require("../models/donator"); // Importa o modelo Donator
var Entity = require("../models/entity"); // Importa o modelo Entity
var mailgunController = require("../controllers_API/donationRESTController.js");
var utils = require("../utils/points.js");


var donationController = {};

// Mostra todas as doações
donationController.showAll = function (req, res) {
    Donation.find({}).populate('donator').populate('entity').exec(function (err, donations) {
        if (err) {
            console.log('Erro ao ler as doações');
            res.redirect('/error');
        } else {
            console.log(donations);
            res.render('../views/donations/donationList', {donations: donations});
        }
    });
};

// Mostra uma doação pelo id
donationController.show = function (req, res) {
    Donation.findOne({_id: req.params.id}).populate('donator').populate('entity').exec(function (err, donation) {
        if (err) {
            console.log('Erro ao ler a doação');
            res.redirect('/error');
        } else {
            res.render('../views/donations/donationViewDetails', {donation: donation});
        }
    });
};

// Formulário para criar uma doação
donationController.formCreate = async function (req, res) {
    try {
        const donators = await Donator.find({}); // Aguarda a consulta para recuperar os doadores
        const entities = await Entity.find({}); // Aguarda a consulta para recuperar as entidades
        res.render("../views/donations/createForm",
            {donators, entities}); // Passa os doadores e entidades para a visualização
    } catch (err) {
        console.error(err);
        res.redirect('/error');
    }
};

// Cria uma doação em resposta a um post em um formulário
donationController.create = async function (req, res) {
    // Log the request body to check its contents
    //console.log("Request body:", req.body);

    // Create a new donation instance with the data from the form
    var donationData = req.body;

    // Omit typeOfClothing for donations of type 'Dinheiro'
    if (donationData.typeOfDonation === 'Dinheiro') {
        console.log("Donation type is Dinheiro. Omitting typeOfClothing.");
        delete donationData.typeOfClothing;
        delete donationData.imageProof;
        delete donationData.warehouseName;
    }
    // Delete amount for donations of type 'Doação Têxtil'
    if (donationData.typeOfDonation === 'Doação Têxtil') {
        console.log("Donation type is Doação Têxtil. Deleting amount.");
        delete donationData.amount;

        const typeOfClothingObjects = []; // Certifique-se de que a variável está definida antes do loop
        for (let i = 0; i < Object.keys(donationData).length; i++) { // Assuming a maximum of 10 items of clothing
            if (donationData[`typeOfClothing[${i}].category`]) {
                const typeOfClothing = {
                    category: donationData[`typeOfClothing[${i}].category`],
                    quantity: donationData[`typeOfClothing[${i}].quantity`],
                    state: donationData[`typeOfClothing[${i}].state`]
                };
                typeOfClothingObjects.push(typeOfClothing);
            }
        }
        donationData.imageProof = req.file ? req.file.filename : null;

        // Assign the array of typeOfClothing objects to the donationData object
        donationData.typeOfClothing = typeOfClothingObjects;
    }

    var donation = new Donation(donationData);
    var points = await utils.calculatePoints(donation);
    donation.points = points;
    const {donators, entities} = req.body;
    //console.log("Attempting to create donation:", donation);
    donation.save(function (err) {
        if (err) {
            console.error("Error saving donation:", err);
            res.render("../views/donations/createForm");
        } else {
            console.log("Successfully created a donation.");
            res.redirect("/donations");
        }
    });
    // Encontrar email do donator pela donation
    Donator.findById(donation.donator, function (err, donator) {
        if (err) {
            console.error("Error finding donator:", err);
        } else {
            console.log("Donator email:", donator.email);
            donatorEmail = donator.email;
            // Enviar email para o donator
            mailgunController.sendEmail(donatorEmail, 'Doação aprovada', 'Sua doação foi aprovada.\nStatus: Aprovada');
            //Nota: O email é enviado para o donator caso o email do doador esteja verificado no mailgun.
        }
    });
};


// Formulário para editar uma doação
donationController.formEdit = function (req, res) {
    Donation.findOne({_id: req.params.id}).exec(function (err, donation) {
        if (err) {
            console.log("Erro ao ler a doação");
            res.redirect("/error");
        } else {
            res.render("../views/donations/donationEditDetails", {donation: donation});
        }
    });
};

// Atualiza uma doação em resposta a um post em um formulário de edição
donationController.edit = function (req, res) {
    Donation.findByIdAndUpdate(req.body._id, req.body, function (err, donation) {
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
    Donation.remove({_id: req.params.id}).exec((err) => {
        if (err) {
            console.log("Erro ao apagar");
            res.redirect("/error");
        } else {
            console.log("Donation deleted!");
            res.redirect("/donations");
        }
    });
};

// Mostra as doações pendentes
donationController.showPending = function(req, res) {
  Donation.find({status: 'Pendente'}).populate('donator').populate('entity').exec(function(err, donations){
    if(err){
      console.log('Erro ao ler as doações pendentes');
      res.redirect('/error');
    } else {
      res.render('../views/approvals/pending', {donations: donations});
    }
  });
};

// Aprova uma doação
donationController.approve = function(req, res) {
  Donation.findByIdAndUpdate(req.params.id, {status: 'Aprovada'}, { new: true }).populate('donator').exec(async function(err, donation){
    if(err){
      console.log('Erro ao aprovar a doação');
      res.status(500).send({message: 'Erro ao aprovar a doação'});
    } else {
      console.log('Doação aprovada!');
      // Verificar se o email de doador foi encontrado
      var donator = await Donator.findById(donation.donator);
      if(donator) {
        console.log("Donator email:", donator.email);
        let donatorEmail = donator.email;
        // Enviar email para o donator
        mailgunController.sendEmail(donatorEmail, 'Doação aprovada', 'Sua doação foi aprovada.\nStatus: Aprovada');
      }
      res.status(200).send({message: 'Doação aprovada com sucesso'});
    }
  });
}

// Mostra as doações aprovadas
donationController.showApproved = function(req, res) {
  Donation.find({status: 'Aprovada'}).populate('donator').populate('entity').exec(function(err, donations){
    if(err){
      console.log('Erro ao ler as doações aprovadas');
      res.redirect('/error');
    } else {
      res.render('../views/donations/donationList', {donations: donations});
    }
  });
};

// Rejeita uma doação
donationController.reject = function(req, res) {
  Donation.findByIdAndUpdate(req.params.id, {status: 'Rejeitada'}, { new: true }).populate('donator').exec(async function(err, donation){
    if(err){
      console.log('Erro ao rejeitar a doação');
      res.status(500).send({message: 'Erro ao rejeitar a doação'});
    } else {
      console.log('Doação rejeitada!');
      // Encontrar email do donator pela donation
      let donator = await Donator.findById(donation.donator);
      if(donator) {
        console.log("Donator email:", donator.email);
        let donatorEmail = donator.email;
        mailgunController.sendEmail(donatorEmail, 'Doação rejeitada', 'Sua doação foi rejeitada.\nStatus: Rejeitada');
      }
      res.status(200).send({message: 'Doação rejeitada com sucesso'});
    }
  });
}

// Mostra as doações rejeitadas
donationController.showRejected = function(req, res) {
  Donation.find({status: 'Rejeitada'}).populate('donator').populate('entity').exec(function(err, donations){
    if(err){
      console.log('Erro ao ler as doações rejeitadas');
      res.redirect('/error');
    } else {
      res.render('../views/donations/donationList', {donations: donations});
    }
  });
};


module.exports = donationController;
