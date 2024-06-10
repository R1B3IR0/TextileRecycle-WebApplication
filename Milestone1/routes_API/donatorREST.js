var express = require('express');
var router = express.Router();
var donatorRESTController = require('../controllers_API/donatorRESTController.js');

router.get('/', donatorRESTController.showAll);

module.exports = router;