const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../jwt_secret/config');
const Entity = require('../models/entity');
const Donator = require('../models/donator');

var authController = {};

authController.login = async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ auth: false, token: null, message: "User not found" });
        }

        // Check if the password is valid
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null, message: "Invalid password" });
        }

        // Create a token
        const token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
            expiresIn: '1d' // expires in 24 hours
        });

        res.status(200).json({ auth: true, token: token, message: "User logged in" });
        
        console.log("User logged in");
    } catch (error) {
        next(error);
    }
};

authController.register = async function(req, res, next) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;

    // Switch case to create db object based on role
    switch(req.body.role) {
        case 'Entity':
            // Verify if the entity is already registered
            var entity = await Entity.findOne({ email: req.body.email })
            var entityUser = await User.findOne({ email: req.body.email })
            if (entityUser) {
                return res.status(409).json({ message: "Entity already registered" });
            } 

            // Not registered, create entity
            if(!entity) {
                // Create entity object with the entity schema
                var newEntity = new Entity({
                    name: req.body.name,
                    contact: req.body.contact,
                    email: req.body.email,
                    description: req.body.description,
                    address: {
                        countryCode: req.body.countryCode,
                        postalCode: req.body.postalCode,
                        addressLocality: req.body.addressLocality,
                        streetAddress: req.body.streetAddress
                    }
                });
                // Save entity to the database
                var storeEntity = await newEntity.save();
            }

            // Create user object with the user schema
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            });

            // Save user to the database
            var storeUser = await newUser.save();
            
            // Respond with success and token
            return res.status(201).json({ message: "Entity registered", user: storeUser });
        case 'Voluntary':
            // Verify if the voluntary is already registered
            var voluntary = await Donator.findOne({ email: req.body.email })
            var voluntaryUser = await User.findOne({ email: req.body.email })
            if (voluntaryUser) {
                return res.status(409).json({ message: "Voluntary already registered" });
            }

            // Not registered, create voluntary
            if(!voluntary) {
                // Create voluntary object with the voluntary schema
                var newVoluntary = new Donator({
                    name: req.body.name,
                    nif: req.body.nif,
                    email: req.body.email,
                    contact: req.body.contact,
                    address: req.body.address,
                    voluntary: true
                });
                // Save voluntary to the database
                var storeVoluntary = await newVoluntary.save();
            }

            // Create user object with the user schema
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            });

            // Save user to the database
            var storeUser = await newUser.save();

            // Respond with success and token
            return res.status(201).json({ message: "Voluntary registered", user: storeUser });
        case 'Donator':
            // Verify if the voluntary is already registered
            var donator = await Donator.findOne({ email: req.body.email })
            var donatorUser = await User.findOne({ email: req.body.email })
            if (donatorUser) {
                return res.status(409).json({ message: "Donator already registered" });
            }

            // Not registered, create voluntary
            if(!donator) {
                // Create voluntary object with the voluntary schema
                var newDonator = new Donator({
                    name: req.body.name,
                    nif: req.body.nif,
                    email: req.body.email,
                    contact: req.body.contact,
                    address: req.body.address,
                    voluntary: true
                });
                // Save voluntary to the database
                var storeDonator = await newDonator.save();
            }

            // Create user object with the user schema
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            });

            // Save user to the database
            var storeUser = await newUser.save();

            // Respond with success and token
            return res.status(201).json({ message: "Donator registered", user: storeUser });
        default:
            return res.status(400).json({ message: "Invalid role" });        
    }
};

authController.getProfile = async function (req, res, next) {
    let id;
    const token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(401).json({ auth: false, message: "No token provided." });
    }
  
    try {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(401).json({ auth: false, message: "Unauthorized" });
        }
        id = decoded.id;
      });
  
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(404).json({ auth: false, message: "User not found" });
      }
      req.email = user.email; // Adiciona o email do usuário ao objeto req
      next(); // Chama o próximo middleware (userRESTController.getAllDonations)
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving user", error: err });
    }
};

// Verify if the user is logged in
authController.verifyToken = function(req, res, next) {
    const authToken = req.headers['x-access-token'];
    if (authToken) {
        jwt.verify(authToken, config.secret, function(err, decoded) {
            if (err) {
                console.log("Token verification failed");
                return res.status(401).json({ message: "Unauthorized access" });
            }
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
        console.log("Token found");
    } else {
        console.log("No token found");
        return res.status(401).json({ message: "Unauthorized access" });
    }
};

module.exports = authController;
