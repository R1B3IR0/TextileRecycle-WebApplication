var moongoose = require('mongoose');
var Schema = moongoose.Schema;	

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    }
});

var User = moongoose.model('User', userSchema);