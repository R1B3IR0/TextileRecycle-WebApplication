// Importe o express
const express = require('express');

// Crie uma instância do roteador
const router = express.Router();

// Importe o controller de configuração de pontos
const configurationPointsController = require('../controllers/configurationPointsController');

// Rota para renderizar a página de configuração de pontos (GET)
router.get('/configure', configurationPointsController.renderConfigurePointsPage);

// Exporte o roteador
module.exports = router;
