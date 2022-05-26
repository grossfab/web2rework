const express = require('express')
const app = express()

var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
//app.set('view engine', 'html');

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log("Home page entered")
    res.render('index.html')
})


app.listen(3000)