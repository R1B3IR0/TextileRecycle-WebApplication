var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");


router.get("/register", userController.formCreate);
router.post("/register", userController.registUser);

router.get("/showAll", userController.showAll);
router.get("/show/:id", userController.show);





module.exports = router;
