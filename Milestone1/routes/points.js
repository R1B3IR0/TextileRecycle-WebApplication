const express = require("express");
const router = express.Router();
const pointController = require("../controllers/pointController");

router.get("/", pointController.showAll);

router.get("/create", pointController.formCreate); // Rota para criar uma nova configuração de pontos com valores predefinidos

router.get("/edit/:id", pointController.formEdit);

router.post("/edit", pointController.edit);

module.exports = router;