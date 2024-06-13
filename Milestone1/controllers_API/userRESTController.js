const { get } = require("mongoose");
let Donation = require("../models/donation");
let Donator = require("../models/donator");
let User = require("../models/user");

var userRESTController = {};

// Get all donations about 1 user and calculate the total points each donation have and return the total points
userRESTController.getPoints = async function(req, res) {
    const email = req.email; // Obtém o email do usuário autenticado do objeto req

    try {
      const donator = await Donator.findOne({ email: email });
      if (!donator) {
        return res.status(404).json({ message: "Donator not found" });
      }
      const donations = await Donation.find({donator:donator._id}).populate('donator').exec();

      // Calcular pontos de doações aprovadas
      const approvedDonations = donations.filter(donation => donation.status === "Aprovada");
      const totalPoints = approvedDonations.reduce((acc, donation) => acc + donation.points, 0);

      return res.status(200).json({ points: totalPoints });
    } catch (error) {
        console.error("Error reading donations:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all donations about 1 userid
userRESTController.getAllDonations = async function (req, res) {
    const email = req.email; // Obtém o email do usuário do objeto req
    console.log(email);
    try {
      const donator = await Donator.findOne({ email: email });
      if (!donator) {
        return res.status(404).json({ message: "Donator not found" });
      }
      const donationsDB = await Donation.find({donator:donator._id}).populate('donator').exec();  
      console.log("OK");

      res.status(200).json(donationsDB);
    } catch (error) {
      console.error("Error getting user donations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  
// Get user info
userRESTController.getUser = async function (req, res) {
  const user = await User.findById(req.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const donator = await Donator.findOne({ email: user.email });
  if (!donator) {
    return res.status(404).json({ message: "Donator not found" });
  }
  const userDTO = {
    name: user.name,
    email: user.email,
    nif: donator.nif,
    contact: donator.contact,
    address: donator.address,
    points: donator.points,
  };

  return res.status(200).json(userDTO);
}

/*
userRESTController.generateVoucher = async function (req, res) {
  const email = req.email; // Obtém o email do usuário do objeto req
  const { points } = req.body;
  try {
    const donator = await Donator.findOne({ email: email });
    if (!donator) {
      return res.status(404).json({ message: "Donator not found" });
    }
    if (donator.points < points) {
      return res.status(400).json({ message: "Not enough points" });
    }
    await Donator.findByIdAndUpdate(donator._id, { $inc: { points: -points } }); // Decrementa os pontos do donator
    
    // Generate UUID
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    return res.status(200).json({ voucher: uuid });
  } catch (error) {
    console.error("Error generating voucher:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
*/

module.exports = userRESTController;