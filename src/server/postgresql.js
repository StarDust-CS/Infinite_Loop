const connection = 'postgres://uhwwflcv:rOFxI453H6EbPzA25RfSamRm_MQE__-S@elmer.db.elephantsql.com:5432/uhwwflcv';
const pgp = require('pg-promise')(/*options*/);
const db = pgp(connection);

module.exports = db;