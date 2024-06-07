var express = require('express');
var router = express.Router();
var entityRESTController = require('../controllers_API/entityRESTController.js');

// Get all entities
router.get('/', entityRESTController.showAll);


module.exports = router;