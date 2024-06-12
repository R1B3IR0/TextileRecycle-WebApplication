var express = require('express');
var router = express.Router();
var donationRESTController = require('../controllers_API/donationRESTController.js');
//const upload = require('../config/uploadConfig'); // Path to upload configuration file

router.get('/', donationRESTController.showAll);
router.get('/show/:id', donationRESTController.show);
router.post('/create', donationRESTController.create);
router.put('/edit/:id', donationRESTController.edit);
router.delete('/delete/:id', donationRESTController.delete);

module.exports = router;