
const db = require('../postgresql.js');

module.exports = {
  /**
    * creates new ticket record
    * @param { Object } req request object
    * @param { object } res response object
    * @param { function } next function to go to next middleware
    */
  addTicket(req, res, next) {
    const ticketInfo = req.body;
    const {
      status,
      ticketID,
      title,
      studentFullName,
      createdAt,
      fellowFullName,
      category,
      problem,
      expect,
      tried,
      hypo,
    } = ticketInfo;

    const ticketInputs = [status, ticketID, title, studentFullName, createdAt, fellowFullName, category, problem, expect, tried, hypo];

    // search db to find name associated with student ID
      // then save to a variable
      // then call 



    res.locals.newTicket = ticketInputs;
    return next();
  },

};
