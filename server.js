console.log('Server started') 
const express = require('express');
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var engines = require('consolidate');
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
//app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/', indexRouter);

app.get('/', (req, res) => {
    console.log("Home page entered")
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    res.render('hafen.ejs')
})


app.listen(8000)
module.exports = app;