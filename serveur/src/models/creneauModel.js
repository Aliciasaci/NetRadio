// import connection
const db = require("../config/database.js");

//Constructeur
const Creneau = function(creneau) {
    this.idCreneau = creneau.idCreneau;
    this.date = creneau.date;
    this.heure = creneau.heure;
    this.idAnimateur = creneau.idAnimateur;
    this.idEmission = creneau.idEmission;
    this.idEpisode = creneau.idEpisode;
};

// Get all creneaux with their animateurs, emissions and episodes
Creneau.getCreneaux = (result) => {
    db.query("SELECT * FROM creneau cre LEFT JOIN animateur ani ON cre.idAnimateur = ani.idAnimateur LEFT JOIN emission emi ON cre.idEmission = emi.idEmission LEFT JOIN episode epi ON cre.idEpisode = epi.idEpisode ORDER BY cre.heure ASC", 
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get all creneaux with their animateurs, emissions and episodes by id
Creneau.getCreneauxById = (date, result) => {
    db.query("SELECT * FROM creneau cre LEFT JOIN animateur ani ON cre.idAnimateur = ani.idAnimateur LEFT JOIN emission emi ON cre.idEmission = emi.idEmission LEFT JOIN episode epi ON cre.idEpisode = epi.idEpisode WHERE cre.idCreneau = ?", [date], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get all creneaux with their animateurs, emissions and episodes by date
Creneau.getCreneauxByDate = (date, result) => {
    db.query("SELECT * FROM creneau cre LEFT JOIN animateur ani ON cre.idAnimateur = ani.idAnimateur LEFT JOIN emission emi ON cre.idEmission = emi.idEmission LEFT JOIN episode epi ON cre.idEpisode = epi.idEpisode WHERE cre.date = ?", [date], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get all creneaux with their animateurs, emission and episode by date and time
Creneau.getCreneauxByDateTime = (date, heure, result) => {
    db.query("SELECT * FROM creneau cre LEFT JOIN animateur ani ON cre.idAnimateur = ani.idAnimateur LEFT JOIN emission emi ON cre.idEmission = emi.idEmission LEFT JOIN episode epi ON cre.idEpisode = epi.idEpisode WHERE cre.date = ? AND cre.heure >= ? ORDER BY cre.heure ASC LIMIT 4", [date, heure], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get un creneau with it's animateur, emission and episode by date and time
Creneau.getCreneauByDateTime = (date, heure, result) => {
    db.query("SELECT * FROM creneau cre LEFT JOIN animateur ani ON cre.idAnimateur = ani.idAnimateur LEFT JOIN emission emi ON cre.idEmission = emi.idEmission LEFT JOIN episode epi ON cre.idEpisode = epi.idEpisode WHERE cre.date = ? AND cre.heure = ?", [date, heure], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert a new creneau to Database
Creneau.insertCreneau = (data, result) => {
    db.query("INSERT INTO creneau SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update a creneau by date and time to database
Creneau.updateCreneauByDateTime = (data, date, heure, result) => {
    db.query("UPDATE creneau SET idAnimateur = ?, idEmission = ?, idEpisode = ? WHERE date = ? AND heure = ?", 
    [data.idAnimateur, data.idEmission, data.idEpisode, date, heure], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete a creneau by date and time from database
Creneau.deleteCreneauByDateTime = (date, heure, result) => {
    db.query("DELETE FROM creneau WHERE date = ? AND heure = ?", [date, heure], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

module.exports = Creneau;