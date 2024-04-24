let express = require('express');
let router = express.Router();
let donatorController = require('../controllers/donatorController.js');
const authController = require('../controllers/authController.js');

// Get all donators
router.get('/', donatorController.showAll, authController.verifyLoginUser);
// Get one donator by id
router.get('/show/:id', donatorController.show, authController.verifyLoginUser);
// Form to create a donator
router.get('/create', donatorController.formCreate, authController.verifyLoginUser);
// Save donator
router.post('/create', donatorController.create, authController.verifyLoginUser);
// Form to edit a donator
router.get('/edit/:id', donatorController.formEdit, authController.verifyLoginUser);
// Save edited donator
router.post('/edit/:id', donatorController.edit, authController.verifyLoginUser);
// Delete donator
router.get('/delete/:id', donatorController.delete, authController.verifyLoginUser);

module.exports = router;