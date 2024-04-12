var moongoose = require("mongoose");
var User = require("../models/user");
const path = require("path");

var userController = {};

userController.formCreate = function (req, res) {
  res.render("../views/users/register");
};

userController.registUser = function (req, res) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/users/register");
    } else {
      console.log("Successfully created an user.");
      res.redirect("../users/showAll");
    }
  });
};

//edit an user
userController.edit = function (req, res) {
  User.findOne({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../users/edit", { user: user });
    }
  }
  );
}

//update an user
userController.update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, email: req.body.email, password: req.body.password } }, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.render("..//users/edit", { user: req.body });
    }
    res.redirect("../users/show" + user._id);
  });
};

//delete an user
userController.delete = function (req, res) {
  User.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("User deleted!");
      res.redirect("../users/showAll");
    }
  });
};

//show all users
userController.showAll = function (req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/showAll", { users: users });
    }
  });
};

//show user by id
userController.show = function (req, res) {
  User.findOne({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/show", { user: user });
    }
  });
};


module.exports = userController;

