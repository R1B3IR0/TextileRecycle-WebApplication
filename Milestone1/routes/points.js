const express = require("express");
const router = express.Router();
const pointController = require("../controllers/pointController");
const authentication = require("../controllers/authController");

router.get("/", authentication.verifyLoginUser, pointController.showAll);

router.get("/create", authentication.verifyLoginUser, pointController.formCreate); // Rota para criar uma nova configuração de pontos com valores predefinidos

router.get("/edit/:id", authentication.verifyLoginUser, pointController.formEdit);

router.post("/edit", authentication.verifyLoginUser, pointController.edit);

module.exports = router;