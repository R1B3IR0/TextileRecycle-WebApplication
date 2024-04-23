var express = require("express");
var router = express.Router();
var entityController = require("../controllers/entityController.js");
// Add in future the authController.js


// Get all entities
router.get('/', entityController.showAll);
// Get one entity by id
router.get('/show/:id', entityController.show);
// Form to create an entity
router.get('/create', entityController.formCreate);
// Save entity
router.post('/create', entityController.create);
// Form to edit an entity
router.get('/edit/:id', entityController.formUpdate);
// Save edited entity
router.post('/edit/:id', entityController.update);
// Delete entity
router.delete('/delete/:id', entityController.delete);

module.exports = router;