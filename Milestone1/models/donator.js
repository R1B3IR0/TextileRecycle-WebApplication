const {model, Schema} = require("mongoose");
var DonatorSchema = new Schema({
    name: {type: String, required: true}, // This is a reference to the User model(Donator)
    email: {type: String, required: true},
    contact: {type: String, required: true},
    address: {type: String, required: true},
    points: {type: Number, default: 0},
});

module.exports = model('Donator', DonatorSchema);