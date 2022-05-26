const helper = require('../helper.js');

class BuchungsanfrageDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Buchungsanfrage WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Buchungsanfrage';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Buchungsanfrage WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(nachname = '', vorname = '', email='',handynr='',beginn='',ende='',bootslaenge='') {
        var sql = 'INSERT INTO Buchungsanfrage (nachname,vorname,email,handynr,beginn,ende,bootslaenge) VALUES (?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [nachname,vorname,email,handynr,beginn,ende,bootslaenge];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }
/*
    update(id, kennzeichnung = '', bezeichnung = '') {
        var sql = 'UPDATE Land SET kennzeichnung=?,bezeichnung=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [kennzeichnung, bezeichnung, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Land WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }*/

    toString() {
        console.log('Buchungsanfrage [_conn=' + this._conn + ']');
    }
}

module.exports = BuchungsanfrageDao;