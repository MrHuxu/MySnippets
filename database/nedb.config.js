var Datastore = require('nedb');
var db = new Datastore({ filename: 'snippets.db', autoload: true});

module.exports = db;