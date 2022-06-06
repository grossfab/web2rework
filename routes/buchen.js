var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');

router                                                  
    .route('/buchen')                                         //method for advanced routing chaining together all requests in ine location
    .get((req, res) => {
        res.render('buchen')
    })
/*     .get((req, res) => {                                   //get
        res.send(`Get booking request with ID ${req.params.id}`)
    }) */
    //Muss hier die BuchungsanfrageDao als Middleware eingesetzt werden?
    .put((req, res) => {                                        
        res.send(`Update booking request  with ID ${req.params.id}`)
    })
/*     .delete('/:id', getBuchungsanfrage, async (req, res) => {
        try {
            await res.buchungsanfrage.remove()
            res.json({ message: 'Deleted booking request'})
        } catch (err) {
            res.status(500).json({ message: err.message })
        } 
})*/

router.param("id", (req, res, next, id) => {               //function runs anytime it finds a  param that matches the name you pass in 
    req.buchungsanfrage = buchungsanfrage[id]                                   //gets user from user array at position [id]
    next()
})


//Middleware zur Buchungsanfrage
async function getBuchungsanfrage(req, res, next){
    let buchungsanfrage
    try {
        buchungsanfrage= await buchungsanfrage.findById(req.params.id)                                 //Buchungsanfrage auf Basis der übermittelten id finden
        if (buchungsanfrage == null){                                                          //Abfrage ob der Buchungsanfrage  existiert                
            return res.status(404).json({ message: 'Cannot find booking request'})   //Fehlermeldung und Rückkehr falls der Abonnent nicht gefunden wurde
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
   
    res.buchungsanfrage = buchungsanfrage                                                       //Liefert den Buchungsanfrage  zurück
    next()                                                                      //Nächste Middelware vernwenden
}

module.exports = router;