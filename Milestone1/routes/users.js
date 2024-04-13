var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");

// Get all users
router.get('/', userController.showAll, authController.verifyLoginUser);
// Get one user by id
router.get('/show/:id', userController.show, authController.verifyLoginUser);
// Form to create a user	
router.get('/create', userController.formCreate, authController.verifyLoginUser);
// Save user
router.post('/create', userController.create, authController.verifyLoginUser);
// Form to edit a user
router.get('/edit/:id', userController.formEdit, authController.verifyLoginUser);
// Save edited user
router.post('/edit/:id', userController.edit, authController.verifyLoginUser);
// Delete user
router.get('/delete/:id', userController.delete, authController.verifyLoginUser);

module.exports = router;
