const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../jwt_secret/config');
const bcrypt = require('bcryptjs');

let authController = {};

authController.submittedLogin = function(req, res, next) {
    const emailInput = req.body.email
    const passwordInput = req.body.password

    User.findOne({email:emailInput})
        .then(function(user){
            // Verify if the user exists
            if (!user) {
                console.log("no user found");
                res.redirect('/login');
            }
            // Verify if the password hash match with the hash password in the database
            bcrypt.compare(passwordInput, user.password)
                .then(function(result){
                    if (result ===true){
                        const authToken = jwt.sign({ email: user.email}, config.secret, { expiresIn: 86400 });
                        res.cookie('auth-token', authToken, {maxAge: 82000})
                        // Add the role option in future for redirecting to the correct page
                        if (user.role === "Admin"){
                            //res.redirect('/admin')
                        } else if (user.role === "User"){
                            //res.redirect('/users')
                        }
                        console.log("User logged in");
                        res.redirect('/users') //redirect to the home page
                        // The default page for now
                    } else {
                        // If the password is incorrect
                        console.log("Password incorrect");
                        res.redirect('/login')
                    }
                })
        })
        .catch(function(err){
            next(err)
        })
};

authController.login = function(req, res, next) {
    res.render('../views/auth/login');
};

authController.logout = function(req, res, next) {
    res.clearCookie('auth-token');
    res.redirect('/');
};

/*
authController.createLogin = function(req, res, next) {
    res.render('login/createUser');
};

authController.createLoginSubmitted = function(req, res, next) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)
    req.body.password = hashedPassword
    
    User.create(req.body)
        .then(function(user){
            const authToken = jwt.sign({ email: user.email, role: user.role}, config.secret, { expiresIn: 86400 });
            res.cookie('auth-token', authToken, {maxAge: 82000});
            res.redirect('/')
        })
        .catch(function(err){
            next(err)
        })
};
*/

authController.verifyLoginUser = function(req, res, next) {
    const authToken = req.cookies['auth-token'];
    if(authToken) {
        jwt.verify(authToken, config.secret, function(err, decoded) {
            req.email = decoded;
            req.password = decoded;
            req.role = decoded;
            next();
        })
        console.log("Token found");
    } else {
        console.log("No token found");
        res.redirect('/login');
    }
}


module.exports = authController;