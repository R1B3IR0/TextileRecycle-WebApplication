var express = require('express');
var router = express.Router();
var userRESTController = require('../controllers_API/userRESTController.js');
var authController = require('../controllers_API/authRESTController.js');

router.get('/', authController.getProfile, userRESTController.getAllDonations); // Get all donations about 1 user

router.get('/points', authController.verifyToken, authController.getProfile , userRESTController.getPoints); // Get all points about 1 user

router.get('/user-info', authController.verifyToken, userRESTController.getUser); // Get all donations about 1 user

//router.patch('/voucher', userRESTController.generateVoucher); // Use a voucher

module.exports = router;