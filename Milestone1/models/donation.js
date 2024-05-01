const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    donator: {
        type: String,
        required: true,
    },
    entity: {
        type: String,
        required: true,
    },
    donationDate: {
        type: Date,
        default: Date.now // Define a data atual no momento da criação do documento
    },
    typeOfDonation: {
        type: String,
        enum: ["Doação Têxtil", "Dinheiro"],
        required: true,
    },
    typeOfClothing: {
        type: String,
        enum: [
            "Fatos e blazers",
            "Calças",
            "Meias e Roupa Interior",
            "Tops e t-shirts",
            "Camisolas e sweaters",
            "Casacos",
            "Pijamas",
            "Outros",
        ],
        required: function () {
            return this.typeOfDonation === "Doação Têxtil";
        },
    },
    state: {
        type: String,
        enum: ["Novo com etiquetas", "Novo sem etiquetas", "Muito bom", "Bom", "Satisfatório"],
        required: function () {
            return this.typeOfDonation === "Doação Têxtil";
        },
    },
    amount: {
        type: Number,
        required: function () {
            return this.typeOfDonation === "Dinheiro";
        },
    },
    warehouseName: { // Novo campo para armazenar o nome do armazém
        type: String,
        required: function () {
            return this.typeOfDonation === "Doação Têxtil";
        },
    },
});

module.exports = mongoose.model("Donation", DonationSchema);