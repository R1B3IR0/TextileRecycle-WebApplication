const express = require("express");
const router = express.Router();
const pointController = require("../controllers/pointController");
const authentication = require("../controllers/authController");

router.get("/", authentication.verifyLoginUser, pointController.showAll);

router.get("/create", pointController.formCreate, authentication.verifyLoginUser); // Rota para criar uma nova configuração de pontos com valores predefinidos

router.get("/edit/:id", pointController.formEdit, authentication.verifyLoginUser);

router.post("/edit", pointController.edit, authentication.verifyLoginUser);

module.exports = router;