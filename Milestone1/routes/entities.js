var express = require("express");
var router = express.Router();
var entityController = require("../controllers/entityController.js");
var authentication = require("../controllers/authController.js");


// Get all entities
router.get('/', authentication.verifyLoginUser, entityController.showAll);
// Get one entity by id
router.get('/show/:id', authentication.verifyLoginUser, entityController.show);
// Form to create an entity
router.get('/create', authentication.verifyLoginUser, entityController.formCreate);
// Save entity
router.post('/create', authentication.verifyLoginUser, entityController.create);
// Form to edit an entity
router.get('/edit/:id', authentication.verifyLoginUser, entityController.formUpdate);
// Save edited entity
router.post('/edit/:id', authentication.verifyLoginUser, entityController.update);
// Delete entity
router.get('/delete/:id', authentication.verifyLoginUser, entityController.delete);

module.exports = router;