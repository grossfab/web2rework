const helper = require('./services/helper.js');
const fileHelper = require('./services/fileHelper.js');

//server setup
const HTTP_PORT = 8000; 
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();

// connect database
console.log('Connect database...');
const Database = require('better-sqlite3');
const dbOptions = { verbose: console.log };
const dbFile = './db/webanw2.sqlite';
const dbConnection = new Database(dbFile, dbOptions);

// provide service router with database connection / store the database connection in global server environment
app.locals.dbConnection = dbConnection;

console.log('Binding middleware...');
app.use(express.static(__dirname + '/public'))
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024        // limit to 2MB
    }
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*'); 
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-nHeaders', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(morgan('dev'));

/* // binding endpoints
const TOPLEVELPATH = '/api';
console.log('Binding enpoints, top level Path at ' + TOPLEVELPATH);

// send default error message if no matching endpoint found
app.use(function (request, response) {
    console.log('Error occured, 404, resource not found');
    response.status(404).json({'fehler': true, 'nachricht': 'Resource nicht gefunden'});
}); */


var path = require('path');
var logger = require('morgan');
var engines = require('consolidate');

//view engine

app.set('view engine', 'ejs')

//static files
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.set('public', __dirname + '/public');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//app.engine('html', engines.mustache);

//app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//router
var indexRouter = require('./routes/index.js');
app.use('/', indexRouter);
// var serviceRouter = require('./dao/buchungsanfrageDao.js');
//app.use(TOPLEVELPATH, serviceRouter); 

app.get('/index', (req, res) => {
    console.log("Home page entered")
    res.render('index')
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

app.get('/buchen', (req, res) => {
    res.render('buchen')
})

app.listen(HTTP_PORT, () => {
    console.log('Server started and running at localhost on port ' + HTTP_PORT)
});

module.exports = app;