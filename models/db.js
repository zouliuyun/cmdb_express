var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

var database = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {auto_reconnect: true}), {safe: true});
var base = exports;
global.BS=base;

database.open(function(err, db){
    if(err){
      return callback(err);
    }
base.database=db
})
//module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}), {safe: true});
