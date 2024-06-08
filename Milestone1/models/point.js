const mongoose = require("mongoose");

const PointCustomizationSchema = new mongoose.Schema({
  newWithTag: {
    type: Number,
    default: 0 // Valor padrão para pontos de doação têxtil com etiquetas
  },
  newWithoutTag: {
    type: Number,
    default: 0 // Valor padrão para pontos de doação têxtil sem etiquetas
  },
  veryGood: {
    type: Number,
    default: 0 // Valor padrão para pontos de doação muito bom
  },
  good: {
    type: Number,
    default: 0 // Valor padrão para pontos de doação bom
  },
  satisfactory: {
    type: Number,
    default: 0 // Valor padrão para pontos de doação satisfatório
  },
  quantity: {
    type: Number,
    default: 0 // Valor padrão para pontos de quantidade
  },
  donationMoney: {
    type: Number,
    default: 0 // Valor padrão para pontos de doação em dinheiro
  }
});

module.exports = mongoose.model("PointCustomization", PointCustomizationSchema);