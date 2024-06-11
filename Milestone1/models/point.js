const mongoose = require("mongoose");

const PointCustomizationSchema = new mongoose.Schema({
  newWithTag: { type: Number, default: 1, min: 1 },
  newWithoutTag: { type: Number, default: 1, min: 1 },
  veryGood: { type: Number, default: 1, min: 1 },
  good: { type: Number, default: 1, min: 1 },
  satisfactory: { type: Number, default: 1, min: 1 },
  quantity: { type: Number, default: 1, min: 1 },
  donationMoney: { type: Number, default: 1, min: 1 }
});

module.exports = mongoose.model("PointCustomization", PointCustomizationSchema);
