// import connection
const db = require("../config/database.js");

//Constructeure
const Episode = function(episode) {
    this.idEpisode = episode.idEpisode;
    this.titreEpisode = episode.titreEpisode;
    this.idEmission = episode.idEmission;
    this.statusSauvegarde = episode.statusSauvegarde;
    this.statusPodcast = episode.statusPodcast;
    this.lien = "";
};

// Get All episodes
Episode.getEpisodes = (result) => {
    db.query("SELECT * FROM episode", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single episode
Episode.getEpisodeById = (id, result) => {
    db.query("SELECT * FROM episode WHERE idEpisode = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert episode to Database
Episode.insertEpisode = (data, result) => {
    db.query("INSERT INTO episode SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update episode by id 
Episode.updateEpisodeById = (data, id, result) => {
    db.query("UPDATE episode SET titreEpisode = ?, idEmission = ?, statusSauvegarde = ?, statusPodcast = ?, lien = ? WHERE idEpisode = ?", [data.titreEpisode, data.idEmission, data.statusSauvegarde, data.statusPodcast, lien, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete episode from database
Episode.deleteEpisodeById = (id, result) => {
    db.query("DELETE FROM episode WHERE idEpisode = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
module.exports = Episode;