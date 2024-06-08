var express = require('express');
var router = express.Router();
var authRESTController = require('../controllers_API/authRESTController.js');

router.post('/login', authRESTController.login);
router.post('/register', authRESTController.register);

//Funções que requerem login- Exemplo
//router.get('/userProfile', authRESTController.verifyToken, authRESTController.getProfile);

module.exports = router;