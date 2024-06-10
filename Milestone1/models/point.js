const mongoose = require("mongoose");

const PointCustomizationSchema = new mongoose.Schema({
  newWithTag: {
    type: Number,
    default: 1, // Valor padrão para pontos de doação têxtil com etiquetas
    validate: {
      validator: function(v) {
        return v >= 1;
      },
      message: props => `${props.value} should not be a negative value!`
    }
  },
  newWithoutTag: {
    type: Number,
    default: 1, // Valor padrão para pontos de doação têxtil sem etiquetas
    validate: {
      validator: function(v) {
        return v >= 1;
      },
      message: props => `${props.value} should not be a negative value!`
    }
  },
  veryGood: {
    type: Number,
    default: 1, // Valor padrão para pontos de doação muito bom
    validate: {
      validator: function(v) {
        return v >= 1;
      },
      message: props => `${props.value} should not be a negative value!`
    }
  },
  good: {
    type: Number,
    default: 1, // Valor padrão para pontos de doação bom
    validate: {
      validator: function(v) {
        return v >= 1;
      },
      message: props => `${props.value} should not be a negative value!`
    }
  },
  satisfactory: {
    type: Number,
    default: 1, // Valor padrão para pontos de doação satisfatório
    validate: {
      validator: function(v) {
        return v >= 1;
      },
      message: props => `${props.value} should not be a negative value!`
    }
  },
  quantity: {
    type: Number,
    default: 1, // Valor padrão para pontos de quantidade
    validate: {
      validator: function(v) {
        return v >= 1;
      },
      message: props => `${props.value} should not be a negative value!`
    }
  },
  donationMoney: {
    type: Number,
    default: 1, // Valor padrão para pontos de doação em dinheiro
    validate: {
      validator: function(v) {
        return v >= 1;
      },
      message: props => `${props.value} should not be a negative value!`
    }
  }
});

module.exports = mongoose.model("PointCustomization", PointCustomizationSchema);
