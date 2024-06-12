var express = require('express');
var router = express.Router();
var userRESTController = require('../controllers_API/userRESTController.js');

router.get('/', userRESTController.getAllDonations); // Get all donations about 1 user
// Nota: Se não funcionar adicionar /:id

router.get('/points', userRESTController.getPoints); // Get all points about 1 user

module.exports = router;