const express = require('express')
const app = express()

var engines = require('consolidate');
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
//app.set('view engine', 'html');


app.get('/', (req, res) => {
    console.log("Home page entered")
    res.render('index.ejs')
})


app.listen(3000)