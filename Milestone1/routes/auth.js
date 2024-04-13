var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController.js');

// GET home page
router.get('/', function(req, res, next) {
    res.redirect('/login');
});

// Login
router.get('/login', authController.login);

// Login
router.post('/loginSubmitted', authController.submittedLogin);

// Logout
router.get('/logout', authController.logout);

// Register
//router.get('/register', authController.createLogin);

// Register
//router.post('/registerSubmitted', authController.createLoginSubmitted);

module.exports = router;