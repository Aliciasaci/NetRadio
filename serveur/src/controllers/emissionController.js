const emission = require('../models/emissionModel.js');

//Oublis pas de vérifier les codes d'erreurs et les exceptions

// Get all emissions with their episodes
const showEmissions = (req, res) => {
    emission.getEmissions((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get an emission with its episodes by id
const showEmissionById = (req, res) => {
    emission.getEmissionById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get all emissions by animateur
const showEmissionsByAnimateur = (req, res) => {
    emission.getEmissionsByAnimateur(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create a new emission                                                       //S'assurer de mettre le content-type à json/application
const createEmission = (req, res) => {
    const data = req.body;
    emission.insertEmission(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update an emission
const updateEmission = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    emission.updateEmissionById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


// Delete an emission
const deleteEmission = (req, res) => {
    const id = req.params.id;
    emission.deleteEmissionById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


const showEpisodesByEmission = (req, res) => {
    const id = req.params.id;
    emission.getEpisodesByEmission(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

const getEmissionByCategorie = (req, res) => {
	const genre = req.params.genre;
	emission.getEmissionByGenre(genre, (err, results) => {
		if (err) {
			res.send(err);
		} else {
			res.json(results);
		}
	});
};
module.exports = { deleteEmission, updateEmission, createEmission, showEmissionById, showEmissionsByAnimateur, showEmissions, showEpisodesByEmission, getEmissionByCategorie };
