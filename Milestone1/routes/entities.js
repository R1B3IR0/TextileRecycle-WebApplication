var express = require("express");
var router = express.Router();
var entityController = require("../controllers/entityController.js");
var authentication = require("../controllers/authController.js");


// Get all entities
router.get('/', authentication.verifyLoginUser, entityController.showAll);
// Get one entity by id
router.get('/show/:id', entityController.show, authentication.verifyLoginUser);
// Form to create an entity
router.get('/create', entityController.formCreate, authentication.verifyLoginUser);
// Save entity
router.post('/create', entityController.create, authentication.verifyLoginUser);
// Form to edit an entity
router.get('/edit/:id', entityController.formUpdate, authentication.verifyLoginUser);
// Save edited entity
router.post('/edit/:id', entityController.update, authentication.verifyLoginUser);
// Delete entity
router.get('/delete/:id', entityController.delete, authentication.verifyLoginUser);

module.exports = router;