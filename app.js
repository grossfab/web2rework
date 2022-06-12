/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})      //???
/////////////////

console.log('Starting server...');

try {
    // create server
    const HTTP_PORT = 3000;
    const express = require('express');                         //Einbinden des Moduls 'express'. Webserver selbst
    const fileUpload = require('express-fileupload');           //Middleware für Dateiuploads
    const cors = require('cors');                               //Middleware für CORS Requests
    const bodyParser = require('body-parser');                  //Middleware zum Parsen von Requests. Vereinfacht Requests
    const morgan = require('morgan');                           //Middleware zum loggen von HTTP Requests.
    const _ = require('lodash');                                //Middleware für Hilfsfunktionen

    console.log('Creating and configuring Web Server...');
    const app = express();                                      //Initialisieren des 'express' Moduls

    app.use(morgan('dev'));
    var path = require('path');
    var logger = require('morgan');
    //view engine
    app.set('view engine', 'ejs')

    //static files
    app.use(express.static('views'));
    app.set('views', __dirname + '/views');
    app.use(express.static('js'));
    app.set('js', __dirname + '/js');
    app.use(express.static('public'));
    app.set('public', __dirname + '/public');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/public', express.static(path.join(__dirname, 'public')));

    app.get('/index', (req, res) => {
        console.log("Home page entered")
        res.render('index')
    })

    app.get('/buchen', (req, res) => {
        res.render('buchen')
    })

    app.get('/betreiber', (req, res) => {
        res.render('betreiber')
    })

    app.get('/hafen', (req, res) => {
        res.render('hafen')
    })

    app.get('/admin', (req, res) => {
        res.render('admin')
    }) 
    

    // starting the Web Server
    console.log('\nBinding Port and starting Webserver...');

    app.listen(HTTP_PORT, () => {
        console.log('Server started and running at localhost on port ' + HTTP_PORT)
    });

    module.exports = app;

} catch (ex) {
    console.error(ex);
}      