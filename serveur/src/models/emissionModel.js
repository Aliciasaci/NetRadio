// import connection
const db = require("../config/database.js");

//Constructeur
const Emission = function(emission, episode) {
    this.nomEmission = emission.nomEmission;
    this.diffusionDate = emission.diffusionDate;
    this.diffusionTime = emission.diffusionTime;
    this.description = emission.description;
    this.genre = emission.genre;
    this.idAnimateur = emission.idAnimateur;
    this.titleEpisode = episode.titleEpisode;
    this.nbEpisode = episode.nbEpisode;
};

let idEmission = 0;

// Get all emissions with their episodes
Emission.getEmissions = (result) => {
    db.query("SELECT emi.*, ep.* FROM emission emi LEFT JOIN episode ep ON emi.idEmission = ep.idEmission ORDER BY emi.diffusionTime ASC", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get an emission with its episodes by id
Emission.getEmissionById = (id, result) => {
    db.query("SELECT * FROM emission emi LEFT JOIN episode ep ON emi.idEmission = ep.idEmission WHERE emi.idEmission = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

//Get toutes les émissions d'un animateur
Emission.getEmissionsByAnimateur = (id, result) => {
    db.query("SELECT * FROM emission WHERE idAnimateur = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
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

// Update an emission to database
Emission.updateEmissionById = (data, id, result) => {
    db.query("UPDATE emission SET ? WHERE idEmission = ?", [data, id], (err, results) => {
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