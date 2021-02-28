// App - BlingBlaw - Danzilla
// Express - REST API
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors - Cross-Origin Resource Sharing
const cors = require('cors');
app.use(cors());

// BodyParser - req.body and Strip to JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST API
const API_Routers = require('./Routers');
app.use('/api', API_Routers);
app.all('*', (req, res) => { res.status(500).send('Invalid Entry #bling') });

// Server_App Port
const APP_PORT = 5000;
// Server Starting
app.listen(APP_PORT, () => { 
    console.log("\n")
    console.log("App: " + process.env.npm_package_name + " v" + process.env.npm_package_version)
    console.log("Author: " + process.env.npm_package_author_name)
    console.log("Git: " + process.env.npm_package_homepage)
    console.log("Server running at http://localhost:" + APP_PORT)
    console.log("\n")
});