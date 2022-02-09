// require express module
const express = require('express');

// require cors module
const cors = require("cors");

// init express
const app = express();

const FileReader = require("filereader");
// parse requests of content-type - application/json
app.use(express.json());

// use cors
app.use(cors());

//timezone
process.env.TZ = 'Europe/Paris';

// require router 
require("./src/routes/routes.js")(app);


//Serveur socket.io
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const options = {
    cors: {
        origin: ['http://localhost:8080']
    },
    // wssAdapter: MyWSSAdapter
}
const io = new Server(server, options);


/**
 * Partie Socket.io
 */
io.on('connection', (socket) => {
    console.log("Un utilisateur s'est connecté")

    //Ecouter les déconnexion
    socket.on("disconnect", (reason) => {
        console.log(`Un utilisateur s'est déconnecté. ${reason}`);
    });

    // AUDIO
    socket.on('radio', function(blob) {
        socket.broadcast.emit('voice', blob);
    });

});


server.listen(3000, () => {
    console.log('listening on *:3000');
});














// path to views

// const path = __dirname + '/src/views/';
// app.use(express.static(path));

// const server = require('http').createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//         origin: ['http://localhost:8080']
//     }
// });

// const io = require("socket.io")(3000, {
//     cors: {
//         origin: ['http://localhost:8080']
//     }
// })
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });

// var reader = new FileReader();
// reader.readAsArrayBuffer(blob);