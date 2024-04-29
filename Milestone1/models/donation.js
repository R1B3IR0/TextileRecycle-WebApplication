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

    /*  donator: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donator",
          required: true,
      },
      entity: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Entity",
          required: true,
      },*/
    donationDate: {
        type: Date,
        required: true,
    },
    typeOfDonation: {
        type: String,
        enum: ["Doação Têxtil", "Dinheiro"],
        required: true,
    }/*,
    imageProof: {
        data: Buffer,
        type: String
    },
    status: {
        type: String,
        enum: ["Pendente", "Aprovado", "Rejeitado"],
        default: "Pendente"
    }*/
});



// Conditionally add typeOfClothing based on typeOfDonation
DonationSchema.add({
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
});
DonationSchema.add({
    amount: {
        type: Number,
        required: function () {
            return this.typeOfDonation === "Dinheiro";
        },
    },
});

module.exports = mongoose.model("Donation", DonationSchema);
