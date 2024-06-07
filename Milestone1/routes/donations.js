const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authentication = require('../controllers/authController');

// Mostra todas as doações
router.get('/', authentication.verifyLoginUser, donationController.showAll);

// Mostra uma doação pelo ID
router.get('/show/:id', authentication.verifyLoginUser, donationController.show);

// Formulário para criar uma doação
router.get('/create', authentication.verifyLoginUser, donationController.formCreate);

// Cria uma doação em resposta a um post em um formulário
router.post('/create', authentication.verifyLoginUser, donationController.create);

// Formulário para editar uma doação
router.get('/edit/:id', authentication.verifyLoginUser, donationController.formEdit);

// Atualiza uma doação em resposta a um post em um formulário de edição
router.post('/edit', authentication.verifyLoginUser, donationController.edit);

// Deleta uma doação
router.get('/delete/:id', authentication.verifyLoginUser, donationController.delete);

module.exports = router;
