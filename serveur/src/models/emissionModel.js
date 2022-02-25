// import connection
const db = require("../config/database.js");

//Constructeur
const Emission = function(emission) {
    this.nomEmission = emission.nomEmission;
    this.description = emission.description;
    this.genre = emission.genre;
    this.idAnimateur = emission.idAnimateur;
};


// Get toutes les émissions
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

// Get une émission par id 
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


//insérer une émission en base de donéne
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

// Update une emission par son id
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

//Delete emission de la base de données
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

//get tous les épisodes d'une emission
Emission.getEpisodesByEmission = (id, result) => {
    db.query("SELECT * FROM episode WHERE idEmission = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}


module.exports = Emission;