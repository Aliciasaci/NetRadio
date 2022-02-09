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
    db.query("SELECT * FROM emission emi LEFT JOIN episode ep ON emi.idEmission = ep.idEmission ORDER BY emi.diffusionTime ASC", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get an emission with it's episode by id
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

// Insert a new emission and new episode if there's an episode to Database
Emission.insertEmission = (data, result) => {
    
    db.query("INSERT INTO emission SET nomEmission = ?, diffusionDate = ?, diffusionTime = ?, description = ?, genre = ?, idAnimateur = ?;", 
    [data.nomEmission, data.diffusionDate, data.diffusionTime, data.description, data.genre, data.idAnimateur], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });

    if(data.titleEpisode != null || data.nbEpisode != null)
    {
        db.query("SELECT idEmission FROM emission ORDER BY idEmission DESC LIMIT 1;", (err, results) => {
            if (err) {
                console.log(err);
            } else {
                idEmission = results[0].idEmission;
                db.query("INSERT INTO episode SET idEmission = ?, titleEpisode = ?, nbEpisode = ?;", 
                [idEmission, data.titleEpisode, data.nbEpisode], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(results);
                    }
                });
            }
        });
    }
    else{

    }
    
}

// Update an emission with it's episode by id to database
Emission.updateEmissionById = (data, id, result) => {
    db.query("UPDATE emission, episode SET emission.nomEmission = ?, emission.diffusionDate = ?, emission.diffusionTime = ?, emission.description = ?, emission.genre = ?, episode.titleEpisode = ?, episode.nbEpisode = ? WHERE emission.idEmission = ? AND episode.idEmission = ?", 
    [data.nomEmission, data.diffusionDate, data.diffusionTime, data.description, data.genre, data.titleEpisode, data.nbEpisode, id, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete an emission with it's episode from database
Emission.deleteEmissionById = (id, result) => {
    db.query("DELETE FROM emission WHERE idEmission = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });

    db.query("DELETE FROM episode WHERE idEmission = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
}

module.exports = Emission;