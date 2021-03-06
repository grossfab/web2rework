const helper = require('../helper.js');
const BuchungsanfrageDao = require('../dao/buchungsanfrageDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Buchungsanfrage');

/*serviceRouter.get('/land/gib/:id', function(request, response) {
    console.log('Service Land: Client requested one record, id=' + request.params.id);

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var obj = landDao.loadById(request.params.id);
        console.log('Service Land: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Land: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/land/alle', function(request, response) {
    console.log('Service Land: Client requested all records');

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var arr = landDao.loadAll();
        console.log('Service Land: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Land: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/land/existiert/:id', function(request, response) {
    console.log('Service Land: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var exists = landDao.exists(request.params.id);
        console.log('Service Land: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Land: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});*/

serviceRouter.post('/buchungsanfrage', function(request, response) {
    console.log('Service Buchungsanfrage: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.nachname)) 
        errorMsgs.push('nachname fehlt');
    if (helper.isUndefined(request.body.vorname)) 
        errorMsgs.push('vorname fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.handynr)) 
        errorMsgs.push('handynr fehlt');
    if (helper.isUndefined(request.body.beginn)) 
        errorMsgs.push('beginn fehlt');
    if (helper.isUndefined(request.body.ende)) 
        errorMsgs.push('ende fehlt');
    if (helper.isUndefined(request.body.bootslaenge)) 
        errorMsgs.push('bootslaenge fehlt');    
    if (errorMsgs.length > 0) {
        console.log('Service Buchungsanfrage: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht m??glich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const buchungsanfrageDao = new BuchungsanfrageDao(request.app.locals.dbConnection);
    try {
        var obj = buchungsanfrageDao.create(request.body.nachname, request.body.vorname,request.body.email, request.body.handynr,request.body.beginn, request.body.ende,request.body.bootslaenge);
        console.log('Service Buchungsanfrage: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Buchungsanfrage: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

/*serviceRouter.put('/land', function(request, response) {
    console.log('Service Land: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Land: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht m??glich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var obj = landDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Land: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Land: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/land/:id', function(request, response) {
    console.log('Service Land: Client requested deletion of record, id=' + request.params.id);

    const landDao = new LandDao(request.app.locals.dbConnection);
    try {
        var obj = landDao.loadById(request.params.id);
        landDao.delete(request.params.id);
        console.log('Service Land: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gel??scht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Land: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});
*/
module.exports = serviceRouter;