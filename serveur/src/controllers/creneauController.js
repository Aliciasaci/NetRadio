const creneau = require('../models/creneauModel.js');

//Oublis pas de vérifier les codes d'erreurs et les exceptions

// Get all creneaux with their animateurs
const showCreneaux = (req, res) => {
    creneau.getCreneaux((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


// Get all creneaux with their animateurs by id
const showCreneauxById = (req, res) => {
    creneau.getCreneauxById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


// Get all creneaux with their animateurs by id
const showCreneauxByDateTime = (req, res) => {
    creneau.getCreneauxByDateTime(req.params.date, req.params.heure, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get all creneaux with their animateurs by date
const showCreneauxByDate = (req, res) => {
    creneau.getCreneauxByDate(req.params.date, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get a creneau with it's animateur by date and time
const showCreneauByDateTime = (req, res) => {
    creneau.getCreneauByDateTime(req.params.date, req.params.heure, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


// Create a new creneau                                                //S'assurer de mettre le content-type à json/application
const createCreneau = (req, res) => {
    const data = req.body;
    creneau.insertCreneau(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update a creneau by date and time
const updateCreneau = (req, res) => {
    const data = req.body;
    const date = req.params.date;
    const heure = req.params.heure;
    creneau.updateCreneauByDateTime(data, date, heure, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


// Delete a creneau
const deleteCreneau = (req, res) => {
    const date = req.params.date;
    const heure = req.params.heure;
    creneau.deleteCreneauByDateTime(date, heure, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

module.exports = { showCreneaux, showCreneauxById, showCreneauxByDateTime,  showCreneauxByDate, showCreneauByDateTime, createCreneau, updateCreneau, deleteCreneau };