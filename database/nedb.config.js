import Datastore from 'nedb';
const db = new Datastore({ filename: 'snippets.db', autoload: true});

export default db;