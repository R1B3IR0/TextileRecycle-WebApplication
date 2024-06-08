const {model, Schema} = require("mongoose");
var DonatorSchema = new Schema({
    name: {type: String, required: true},
    nif: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: String, required: true},
    address: {type: String, required: true},
    points: {type: Number, default: 0},
    voluntary: {type: Boolean, default: false}
});

module.exports = model('Donator', DonatorSchema);