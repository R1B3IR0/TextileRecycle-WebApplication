var express = require('express');
var router = express.Router();
var donationRESTController = require('../controllers_API/donationRESTController.js');
var authController = require('../controllers_API/authRESTController.js');

router.get('/',authController.verifyToken ,donationRESTController.showAll);
router.get('/show/:id', authController.verifyToken, donationRESTController.show);
router.post('/create', authController.verifyToken, authController.getProfile, donationRESTController.create);
router.put('/edit/:id', authController.verifyToken, donationRESTController.edit);
router.delete('/delete/:id', authController.verifyToken, donationRESTController.delete);

module.exports = router;