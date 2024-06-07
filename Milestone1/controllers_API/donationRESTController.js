let mongoose = require("mongoose");
let Donation = require("../models/donation"); // Importa o modelo Donation

let donationRESTController = {};

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
      
      const typeOfClothingObjects = [];
      for (let i = 0; i < Object.keys(donationData).length; i++) {
        if (donationData[`typeOfClothing[${i}].category`]) {
            const typeOfClothing = {
                category: donationData[`typeOfClothing[${i}].category`],
                quantity: donationData[`typeOfClothing[${i}].quantity`],
                state: donationData[`typeOfClothing[${i}].state`]
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
    res.status(201).json(donation, {message: 'Successfully created a donation.'});
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({error: 'Error saving donation.'});
  }
};

// Atualiza o status de uma doação
donationRESTController.updateStatus = async function (req, res) {
  try {
    const { id, status } = req.body; // Recebendo ID da doação e novo status do corpo da requisição
    if (!["Aprovada", "Rejeitada"].includes(status)) {
      return res.status(400).json({error: 'Invalid status.'});
    }

    let donation = await Donation.findByIdAndUpdate(id, { status }, { new: true });
    console.log(`Donation ${status}!`);
    res.status(200).json(donation, {message: `Donation ${status}!`});
  } catch (err) {
    console.log("Error updating donation status");
    res.status(500).json({error: 'Error updating donation status.'});
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
