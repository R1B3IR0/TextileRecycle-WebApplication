var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
    // In future try to add an image field to the entity schema
    name: {type: String, required: true},
    contact: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String, required: true},
    address: {
        countryCode: {type: String, required: true},
        postalCode: {type: String, required: true},
        addressLocality: {type: String, required: true},
        streetAddress: {type: String, required: true},
    },
});

module.exports = mongoose.model('Entity', EntitySchema);