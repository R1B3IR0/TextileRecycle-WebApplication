let mongoose = require("mongoose");
let Entity = require("../models/entity");

let entityController = {};

// show all entities
entityController.showAll = function (req, res) {
    Entity.find({}).exec(function (err, dbentities) {
        if (err) {
            console.log('Erro a ler');
            next(err);
        } else {
            console.log(dbentities);
            res.json(dbentities);
        }
    });
};

module.exports = entityController;