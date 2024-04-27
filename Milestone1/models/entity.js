var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
<<<<<<< HEAD
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['Pendente', 'Aprovado', 'Rejeitado'], default: 'Pendente'},
    donationsReceived:[{type: mongoose.Schema.Types.ObjectId, ref: 'Donation'}],
    //typeEntity: { type: String, enum: ['Person', 'Organization'], required: true },
=======
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
>>>>>>> origin/pedro
});

module.exports = mongoose.model('Entity', EntitySchema);