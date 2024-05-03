const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authentication = require('../controllers/authController');

// Mostra todas as doações
router.get('/', authentication.verifyLoginUser, donationController.showAll);

// Mostra uma doação pelo ID
router.get('/show/:id', donationController.show, authentication.verifyLoginUser);

// Formulário para criar uma doação
router.get('/create', donationController.formCreate, authentication.verifyLoginUser);

// Cria uma doação em resposta a um post em um formulário
router.post('/create', donationController.create, authentication.verifyLoginUser);

// Formulário para editar uma doação
router.get('/edit/:id', donationController.formEdit, authentication.verifyLoginUser);

// Atualiza uma doação em resposta a um post em um formulário de edição
router.post('/edit', donationController.edit, authentication.verifyLoginUser);

// Deleta uma doação
router.get('/delete/:id', donationController.delete, authentication.verifyLoginUser);

module.exports = router;
