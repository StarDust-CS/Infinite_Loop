const connection = 'postgres://gttmqzxg:h2Zkoz5a1R61uZT03gfGYTKfdOIZnURu@elmer.db.elephantsql.com:5432/gttmqzxg';
const pgp = require('pg-promise')(/*options*/);
const db = pgp(connection);

module.exports = db;