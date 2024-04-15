var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    //type: { type: String, enum: ['Person', 'Organization'], required: true },
    // Add more fields here
});