const episode = require('../models/episodeModel.js');

//Oublis pas de vérifier les codes d'erreurs et les exceptions

// Get All episodes
const showEpisodes = (req, res) => {
    episode.getEpisodes((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

const showEpisodeById = (req, res) => {
    episode.getEpisodeById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Episode                                                          //S'assurer de mettre le content-type à json/application
const createEpisode = (req, res) => {
    const data = req.body;
    episode.insertEpisode(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Episode
const updateEpisode = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    episode.updateEpisodeById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


// Delete Episode
const deleteEpisode = (req, res) => {
    const id = req.params.id;
    episode.deleteEpisodeById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

module.exports = { showEpisodeById, showEpisodes, createEpisode, updateEpisode, deleteEpisode };