var express = require('express');
var router = express.Router();
const donationController = require('../controllers/donationController');
const authentication = require('../controllers/authController');

// Mostra todas as doações pendentes
router.get('/', authentication.verifyLoginUser, donationController.showPending);

// Aprova uma doação
router.post('/approve/:id', authentication.verifyLoginUser, donationController.approve);

// Rejeita uma doação
router.put('/reject/:id', authentication.verifyLoginUser, donationController.reject);

// Mostra todas as doações aprovadas
router.get('/approved', authentication.verifyLoginUser, donationController.showApproved);

// Mostra todas as doações rejeitadas
router.get('/rejected', authentication.verifyLoginUser, donationController.showRejected);

module.exports = router;