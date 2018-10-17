
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
      // ticketID : primary key of tickets
      title,
      createdAt,
      studentFullName,
      fellowFullName,
      // closedFullName: default to 0
      category,
      problem,
      expect,
      tried,
      hypo,
    } = ticketInfo;

    const firstNameStudent = studentFullName.split(' ')[0];
    const firstNameFellow = fellowFullName.split(' ')[0];

    const createTicket = () => {
      const ticketInputs = [status, title, createdAt, res.locals.studentID, res.locals.fellowID, 0, category, problem, expect, tried, hypo];

      console.log('ticketInputs: ', ticketInputs);

      db.one('INSERT INTO tickets("status", "title", "created_at", "student_id", "fellow_id", "closer_id", "category", "problem", "expect", "tried", "hypo") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', ticketInputs)
        .then((data) => {
          console.log('new data: ', data);
          res.locals.newTicket = data;
          return next();
        })
        .catch(err => console.error(err));
    };

    db.any('SELECT * FROM users WHERE first_name=$1', [firstNameStudent])
      .then((data) => {
        console.log('student: ', data[0]._id);
        res.locals.studentID = data[0]._id;
        console.log(res.locals.studentID);
      })
      .catch(err => console.error(err));

    db.any('SELECT * FROM users WHERE first_name=$1', [firstNameFellow])
      .then((data) => {
        console.log('fellow: ', data[0]._id);
        res.locals.fellowID = data[0]._id;
        console.log(res.locals.fellowID);
      })
      .then(() => createTicket())
      .catch(err => console.error(err));
  },

};
