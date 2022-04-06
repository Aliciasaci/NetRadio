const mysql = require("mysql");

// create the connection to database
const db = mysql.createConnection({
    host: 'mysql-netradio.alwaysdata.net',
    user: 'netradio',
    password: 'Radionet.0',
    database: 'netradio_bd'
});

db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = db;