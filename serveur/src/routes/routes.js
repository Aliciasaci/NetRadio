module.exports = app => {

    let router = require("express").Router();
    app.use('/', router);

    const auditeur = require('../controllers/auditeurController');
    const animateur = require('../controllers/animateurController');
    const emission = require('../controllers/emissionController');
    const creneau = require('../controllers/creneauController');

    /**
     * Routes des auditeurs
     */
    //get tous les auditeurs
    router.get('/auditeurs', auditeur.showAuditeurs);

    // get un seul utilisateur par id 
    router.get('/auditeurs/:id', auditeur.showAuditeurById);

    // Créer nouveau auditeur
    router.post('/auditeurs', auditeur.createAuditeur);

    // update un auditeur
    router.put('/auditeurs/:id', auditeur.updateAuditeur);

    // delete un auditeur
    router.delete('/auditeurs/:id', auditeur.deleteAuditeur);



    /**
     * Routes des Animateurs
     */
    //get tous les animateurs
    router.get('/animateurs', animateur.showAnimateurs);

    // get un seul animateur par id 
    router.get('/animateurs/:id', animateur.showAnimateurById);

    // Créer nouveau animateur
    router.post('/animateurs', animateur.createAnimateur);

    // update un animateur
    router.put('/animateurs/:id', animateur.updateAnimateur);

    // delete un animateur
    router.delete('/animateurs/:id', animateur.deleteAnimateur);



    /**
     * Routes des émissions
     */
    //get toutes les émissions
    router.get('/emissions', emission.showEmissions);

    // get une seule émission par id 
    router.get('/emissions/:id', emission.showEmissionById);

    // Créer nouvelle émission
    router.post('/emissions', emission.createEmission);

    // update une émission
    router.put('/emissions/:id', emission.updateEmission);

    // delete une émission
    router.delete('/emissions/:id', emission.deleteEmission);



    /**
     * Routes des créneaux
     */
    // get tous les créneaux
    router.get('/creneaux', creneau.showCreneaux);

    // get tous les créneaux par date
    router.get('/creneaux/:date', creneau.showCreneauxByDate);

    // get un seul créneau par date et heure
    router.get('/creneaux/:date/:heure', creneau.showCreneauByDateTime);

    // créer un créneau
    router.post('/creneaux', creneau.createCreneau);

    // update un créneau
    router.put('/creneaux/:date/:heure', creneau.updateCreneau);

    // delete un créneau
    router.delete('/creneaux/:date/:heure', creneau.deleteCreneau);
}