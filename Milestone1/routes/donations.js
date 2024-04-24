const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Mostra todas as doações
router.get('/', donationController.showAll);

// Mostra uma doação pelo ID
router.get('/show/:id', donationController.show);

// Formulário para criar uma doação
router.get('/create', donationController.formCreate);

// Cria uma doação em resposta a um post em um formulário
router.post('/create', donationController.create);

// Formulário para editar uma doação
router.get('/edit/:id', donationController.formEdit);

// Atualiza uma doação em resposta a um post em um formulário de edição
router.post('/edit', donationController.edit);

// Deleta uma doação
router.get('/delete/:id', donationController.delete);

module.exports = router;
