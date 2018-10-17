//server exported in order to close database after tests are done
const db = require('../postgresql.js');

module.exports = {
  setCookie(req, res, next) {},
};
