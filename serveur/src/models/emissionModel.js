// import connection
const db = require("../config/database.js");

//Constructeur
const Emission = function(emission) {
    this.title = emission.title;
    this.episode = emission.episode;
    this.diffusionDate = emission.diffusionDate;
    this.diffusionTime = emission.diffusionTime;
    this.description = emission.description;
    this.genre = emission.genre;
    this.statusSauvegarde = emission.statusSauvegarde;
    this.statusPodcast = emission.statusPodcast;
    this.idAnimateur = emission.idAnimateur;
};

// Get all emissions
Emission.getEmissions = (result) => {
    db.query("SELECT * FROM emission", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get an emission by id
Emission.getEmissionById = (id, result) => {
    db.query("SELECT * FROM emission WHERE idEmission = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert a new emission to Database
Emission.insertEmission = (data, result) => {
    db.query("INSERT INTO emission SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update an emission by id to database
Emission.updateEmissionById = (data, id, result) => {
    db.query("UPDATE emission SET title = ?, episode = ?, diffusionDate = ?, diffusionTime = ?, description = ?, genre = ? WHERE idEmission = ?", 
    [data.title, data.episode, data.diffusionDate, data.diffusionTime, data.description, data.genre, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete an emission from database
Emission.deleteEmissionById = (id, result) => {
    db.query("DELETE FROM emission WHERE idEmission = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

module.exports = Emission;