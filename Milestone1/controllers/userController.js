var mongoose = require("mongoose");
var User = require("../models/user");
var bcrypt = require('bcryptjs');

var userController = {};

// show all users
userController.showAll = function(req, res) {
  User.find({}).exec(function(err, dbusers){
    if(err){
      console.log('Erro a ler');
      res.redirect('/error')
    } else {
      console.log(dbusers);
      res.render('../views/users/userList', {users: dbusers});
    }
  });
};

// show 1 user by id
userController.show = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function(err, dbuser){
    if(err){
      console.log('Erro a ler');
      res.redirect('/error')
    } else {
      res.render('../views/users/userViewDetails', {user: dbuser});
    }
  });
};

// form to create 1 user
userController.formCreate = function (req, res) {
  res.render("../views/users/createForm");
};

// create 1 user as a response to a post in a form
userController.create = function (req, res) {  
  // hash password given by user
  bcrypt.hash(req.body.password, 8, function(err, hashedPassword) {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).send("Error creating user");
      return;
    }
    // atribution of hashed password to the password field of the user
    req.body.password = hashedPassword;
    
    var user = new User(req.body);

    console.log("Attempting to create user:", user);
    user.save(function(err) {
      if (err) {
        console.error("Error saving user:", err);
        res.render("../views/users/createForm");
      } else {
        console.log("Successfully created an user.");
        res.redirect("/users");
      }
   });
  });
};

// show form to edit an user
userController.formEdit = function (req, res) {
  User.findOne({ _id: req.params.id }).exec(function (err, dbuser) {
    if (err) {
      console.log("Error a ler");
      res.redirect("/error");
    } else {
      res.render("../views/users/userEditDetails", { user: dbuser});
    }
  });
};

// update 1 user as a reply to a post in a form edit 
userController.edit = function (req, res) {
  // Verificar se a senha foi alterada
  if (req.body.password) {
    // Se a senha foi alterada, hash a nova senha
    bcrypt.hash(req.body.password, 8, function(err, hashedPassword) {
      if (err) {
        console.error("Error hashing password:", err);
        res.status(500).send("Error updating user");
        return;
      }
      // Atualizar a senha com a nova senha encriptada
      req.body.password = hashedPassword;
      
      // Atualizar o usuário no banco de dados
      User.findByIdAndUpdate(req.body._id, req.body, function(err, dbuser) {
        if (err) {
          console.log("Erro a gravar");
          res.redirect("/error");
        } else {
          console.log("User updated!");
          res.redirect("/users/show/"+req.body._id);
        }
      });
    });
  } else {
    // Se a senha não foi alterada, apenas atualize os outros campos do usuário
    User.findByIdAndUpdate(req.body._id, req.body, function(err, dbuser) {
      if (err) {
        console.log("Erro a gravar");
        res.redirect("/error");
      } else {
        console.log("User updated!");
        res.redirect("/users/show/"+req.body._id);
      }
    });
  }
};

//delete 1 user
userController.delete = function (req, res) {
  User.remove({ _id: req.params.id}).exec((err)=>{
    if (err) {
      console.log("Erro a apagar");
      res.redirect("/error");
    } else {
      console.log("User deleted!");
      res.redirect("/users");
    }
  });
};

module.exports = userController;