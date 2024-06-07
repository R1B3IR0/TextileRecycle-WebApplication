let express = require('express');
let router = express.Router();
let donatorController = require('../controllers/donatorController.js');
const authController = require('../controllers/authController.js');

// Get all donators
router.get('/', authController.verifyLoginUser, donatorController.showAll);
// Get one donator by id
router.get('/show/:id', authController.verifyLoginUser, donatorController.show);
// Form to create a donator
router.get('/create', authController.verifyLoginUser, donatorController.formCreate);
// Save donator
router.post('/create', authController.verifyLoginUser, donatorController.create);
// Form to edit a donator
router.get('/edit/:id', authController.verifyLoginUser, donatorController.formEdit);
// Save edited donator
router.post('/edit/:id', authController.verifyLoginUser, donatorController.edit);
// Delete donator
router.get('/delete/:id', authController.verifyLoginUser, donatorController.delete);

module.exports = router;