var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['Pendente', 'Aprovado', 'Rejeitado'], default: 'Pendente'},
    donationsReceived:[{type: mongoose.Schema.Types.ObjectId, ref: 'Donation'}],
    //typeEntity: { type: String, enum: ['Person', 'Organization'], required: true },
});

module.exports = mongoose.model('Entity', EntitySchema);