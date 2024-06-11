var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");

// Get all users
router.get('/', authController.verifyLoginUser, userController.showAll);
// Get one user by id
router.get('/show/:id', authController.verifyLoginUser, userController.show);
// Form to create a user	
router.get('/create', authController.verifyLoginUser, userController.formCreate);
// Save user
router.post('/create',  authController.verifyLoginUser,userController.create);
// Form to edit a user
router.get('/edit/:id', authController.verifyLoginUser, userController.formEdit);
// Save edited user
router.post('/edit/:id', authController.verifyLoginUser, userController.edit);
// Delete user
router.get('/delete/:id', authController.verifyLoginUser, userController.delete);

module.exports = router;
