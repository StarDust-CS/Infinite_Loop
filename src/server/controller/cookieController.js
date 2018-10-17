//server exported in order to close database after tests are done
const db = require('../postgresql.js');

module.exports = {
  setCookie(req, res, next) {
    res.cookie('codesmith', '1234');
    res.cookie('secret', Math.floor(Math.random() * 100));
    return next();
  },
  setSSIDCookie(req, res, next) {
    
  }
};
