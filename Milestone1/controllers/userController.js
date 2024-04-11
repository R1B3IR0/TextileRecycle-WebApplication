var moongoose = require("mongoose");
var User = require("../models/user");
const path = require("path");

var userController = {};

//register a user
userController.createUser = async (req, res) => {
  try {
    //extract user data from request body
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    //create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    //save the user to the database
    await newUser.save();

    //return success message
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log("Error creating user: ", error);
    return res.status(500).send("Error creating user");
  }
};

module.exports = userController;