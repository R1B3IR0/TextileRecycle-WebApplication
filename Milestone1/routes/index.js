var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});



module.exports = router;
