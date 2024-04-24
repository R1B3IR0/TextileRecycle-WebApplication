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
    required: true,
  },
  typeOfDonation: {
    type: String,
    enum: ["Doação Têxtil", "Dinheiro"],
    required: true,
  },
  amount: {
    type: Number,
    required: function() {
      return this.typeOfDonation === "Dinheiro";
    },
  },
});

// Conditionally add typeOfClothing based on typeOfDonation
DonationSchema.add({
  typeOfClothing: {
    state: {
      type: String,
      enum: ["", "Novo com etiquetas", "Novo sem etiquetas", "Muito bom", "Bom", "Satisfatório"],
      required: function() {
        return this.typeOfDonation === "Doação Têxtil";
      },
    },
    category: {
      type: String,
      enum: [
        "",
        "Fatos e blazers",
        "Calças",
        "Meias e Roupa Interior",
        "Tops e t-shirts",
        "Camisolas e sweaters",
        "Casacos",
        "Pijamas",
        "Outros",
      ],
      required: function() {
        return this.typeOfDonation === "Doação Têxtil";
      },
    },
  },
});

module.exports = mongoose.model("Donation", DonationSchema);
