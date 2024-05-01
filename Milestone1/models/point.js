const mongoose = require("mongoose");

const PointsConfigSchema = new mongoose.Schema({
  newWithTag: Number,
  newWithoutTag: Number,
  veryGood: Number,
  good: Number,
  satisfactory: Number,
  quantity: Number,
  donationMoney: Number
});

const Point = mongoose.model('Point', PointsConfigSchema);

module.exports = Point;
