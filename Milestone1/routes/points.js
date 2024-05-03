const express = require("express");
const router = express.Router();
const pointController = require("../controllers/pointController");

router.get("/", pointController.showAll);

router.get("/create", pointController.formCreate);

router.post("/create", pointController.create);

router.get("/edit/:id", pointController.formEdit);

router.post("/edit", pointController.edit);

module.exports = router;