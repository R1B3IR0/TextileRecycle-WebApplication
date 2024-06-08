var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User', 'Entity', 'Voluntary', 'Donator'], required: true }
});

module.exports = mongoose.model('User', UserSchema);