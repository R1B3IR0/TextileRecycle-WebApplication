let mongoose = require("mongoose");
let Entity = require("../models/entity");
let entityController = {};

// show all entities
entityController.showAll = function (req, res) {
    Entity.find({}).exec(function (err, dbentities) {
        if (err) {
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log(dbentities);
            res.render('../views/entities/entityList', {entities: dbentities});
        }
    });
};

// show 1 entity by id
entityController.show = function (req, res) {
    Entity.findOne({_id: req.params.id}).exec(function (err, dbentity) {
        if (err) {
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('../views/entities/entityViewDetails', {entity: dbentity});
        }
    });
};

// form to create 1 entity
entityController.formCreate = function (req, res) {
    res.render("../views/entities/createForm");
};

// create 1 entity as a response to a post in a form
entityController.create = function (req, res) {

    var entity = new Entity(req.body);

    console.log("Attempting to create entity:", entity);
    entity.save(function (err) {
        if (err) {
            console.error("Error saving entity:", err);
            res.render("../views/entities/createForm");
        } else {
            console.log("Successfully created an entity.");
            res.redirect("/entities");
        }
    });
};

// form to update 1 entity
entityController.formUpdate = function (req, res) {
    Entity.findOne({_id: req.params.id}).exec(function (err, dbentity) {
        if (err) {
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render("../views/entities/entityEditDetails", {entity: dbentity});
        }
    });
};

// update 1 entity as a response to a post in a form
entityController.update = function (req, res) {
    Entity.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, dbentity) {
        if (err) {
            console.error("Error updating entity:", err);
            res.redirect("/error");;
        } else {
            console.log("Successfully updated entity.");
            res.redirect("/entities");

        }
    });
}

// delete 1 entity
entityController.delete = function (req, res) {
    Entity.remove({_id: req.params.id}, function (err) {
        if (err) {
            console.error("Error deleting entity:", err);
            res.redirect("/error");
        } else {
            console.log("Successfully deleted entity.");
            res.redirect("/entities");
        }
    });
};

module.exports = entityController;