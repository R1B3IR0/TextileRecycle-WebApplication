
let Donation = require("../models/donation");
let user = require("../models/user");

var userRESTController = {};

// Get all donations about 1 user and calculate the total points each donation have and return the total points
userRESTController.getPoints = async function(req, res) {
    const dbdonations = await Donation.find({ user: req.id }).exec();
    if (!dbdonations) {
        res.status(204).send("Error reading donations");
        return;
    }

    const totalPoints = dbdonations.reduce((acc, donation) => acc + donation.points, 0); // reduce é usado para reduzir todos os elementos de um array a um único valor.
    
    return res.status(200).send({ donations:dbdonations, points : totalPoints });
};


// Get all donations about 1 userid
userRESTController.getAllDonations = async function(req, res) {
    const dbdonations = await Donation.find({ user: req.id }).exec();
    if (!dbdonations) {
        res.status(204).send("Error reading donations");
        return;
    }

    return res.status(200).send(dbdonations);
};

module.exports = userRESTController;