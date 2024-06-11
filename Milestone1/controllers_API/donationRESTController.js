let mongoose = require("mongoose");
let Donation = require("../models/donation"); // Importa o modelo Donation
let Donator = require("../models/donator"); // Importa o modelo Donator
let API_KEY = '45a1b43f375f80d2499986242c462445-51356527-f76ca7e1';
let DOMAIN = 'sandboxfa7f75b021034c2f9524c657433c81db.mailgun.org';
const mailgun = require('mailgun-js')
    ({ apiKey: API_KEY, domain: DOMAIN });

let donationRESTController = {};



// Mailgun API
donationRESTController.sendEmail = function (to, subject, text) {
  const data = {
    "from": 'testepaw2324@test.com',
    "to": to,
    "subject": subject,
    "text": text
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', body);
    }
  });
};
//////////////////////////////////////////////////////

// Mostra todas as doações
donationRESTController.showAll = async function(req, res, next) {
  try {
    let donations = await Donation.find({}).populate('donator').populate('entity').exec();
    console.log(donations);
    res.json(donations);
  } catch (err) {
    console.log('Erro ao ler as doações');
    next(err);
  }
};

// Mostra uma doação pelo id
donationRESTController.show = async function(req, res, next) {
  try {
    let donation = await Donation.findOne({_id: req.params.id}).populate('donator').populate('entity').exec();
    res.json(donation);
  } catch (err) {
    console.log('Erro ao ler a doação');
    next(err);
  }
};

/*
TODO: A doação é criada com status "Pendente".
Dependendo ou não da aprovação da doação, o status pode ser atualizado posteriormente.
Caso a doação não seja aprovada, o status pode ser atualizado para "Rejeitada" e a doação é eliminada da base de dados.
*/ 
donationRESTController.create = async function (req, res) {
  try {
    console.log("Request body:", req.body);
    let donationData = req.body;
    donationData.status = "Pendente"; // Definindo status como "Pendente"

    // Omitir typeOfClothing para doações de tipo 'Dinheiro'
    if (donationData.typeOfDonation === 'Dinheiro') {
      console.log("Donation type is Dinheiro. Omitting typeOfClothing.");
      delete donationData.typeOfClothing;
    }
    // Deletar amount para doações de tipo 'Doação Têxtil'
    if (donationData.typeOfDonation === 'Doação Têxtil') {
      console.log("Donation type is Doação Têxtil. Deleting amount.");
      delete donationData.amount;

      // Processar os itens de vestuário
      let typeOfClothingObjects = [];
      for (let i = 0; i < donationData.typeOfClothing.length; i++) {
        const item = donationData.typeOfClothing[i];
        if (item.category) {
          const typeOfClothing = {
            category: item.category,
            quantity: item.quantity,
            state: item.state
          };
          typeOfClothingObjects.push(typeOfClothing);
        }
      }
      donationData.typeOfClothing = typeOfClothingObjects;
    }

    let donation = new Donation(donationData); // Cria uma nova doação
    console.log("Attempting to create donation:", donation);
    await donation.save();
    console.log("Successfully created a donation.");
    res.status(201).json({ message: 'Successfully created a donation.', donation });
    //Encontrar email do donator pela donation
    let donator = await Donator.findById(donation.donator);
    console.log("Donator email:", donator.email);
    donatorEmail = donator.email;
    // Enviar email para o donator
    donationRESTController.sendEmail(donatorEmail, 'Doação criada', 'Sua doação foi criada com sucesso!\nDoação pendente de aprovação\n\nStatus: Pendente' );
    //Nota: O email é enviado para o donator caso o email do doador esteja verificado no mailgun.
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({ error: 'Error saving donation.' });
  }
};


// Atualiza uma doação em resposta a um post em um formulário de edição
donationRESTController.edit = async function (req, res) {
  try {
    let donation = await Donation.findByIdAndUpdate(req.body._id, req.body, { new: true });
    console.log("Donation updated!");
    res.status(200).json(donation, {message: 'Donation updated!'});
  } catch (err) {
    console.log("Erro ao gravar");
    res.status(500).json({error: 'Error updating donation.'});
  }
};

// Deleta uma doação
donationRESTController.delete = async function (req, res) {
  try {
    await Donation.remove({ _id: req.params.id}).exec();
    console.log("Donation deleted!");
    res.status(200).json({message: 'Donation deleted!'});
  } catch (err) {
    console.log("Erro ao apagar");
    res.status(500).json({error: 'Error deleting donation.'});
  }
};

module.exports = donationRESTController;
