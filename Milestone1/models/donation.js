const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  donator: {
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
    select: false, // Não selecionável por padrão
  },
  typeOfClothing: {
    state : {
      type: String,
      enum: ["Novo com etiquetas", "Novo sem etiquetas","Muito bom", "Bom", "Satisfatório"],
      select: false, // Não selecionável por padrão
      required: function() {
        return this.typeOfDonation === "Doação Têxtil";
      }
    },
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
    select: false, // Não selecionável por padrão
    required: function() {
      return this.typeOfDonation === "Doação Têxtil";
    }
  },
});

// Configuração para tornar os campos selecionáveis dependendo do tipo de doação
DonationSchema.pre("findOne", function () {
  if (this.typeOfDonation === "Dinheiro") {
    this.select("+amount");
  } else if (this.typeOfDonation === "Doação Têxtil") {
    this.select("+typeOfClothing");
  }
});

module.exports = mongoose.model("Donation", DonationSchema);
