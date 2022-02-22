// import connection
const db = require("../config/database.js");

const Categorie = function (categorie) {
	this.nomCategorie = categorie.nom;
};

Categorie.getCategories = (result) => {
	db.query("SELECT * FROM categorie;", (err, results) => {
		if (err) {
			console.log(err);
			result(err, null);
		} else {
			result(null, results);
		}
	});
};

Categorie.createNewCategorie = (data, result) => {
	db.query(
		"INSERT INTO categories SET nom = ?;",
		[data.nomCategorie],
		(err, results) => {
			if (err) {
				console.log(err);
				results(err, null);
			} else {
				result(null, results);
			}
		}
	);
};
