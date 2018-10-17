
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
      studentID,
      fellowFullName,
      // closedFullName: default to 0
      category,
      problem,
      expect,
      tried,
      hypo,
    } = ticketInfo;

    // const firstNameStudent = studentFullName.split(' ')[0];
    // const firstNameFellow = fellowFullName.split(' ')[0];


    const createTicket = () => {
      const ticketInputs = [status, title, new Date(), studentID, 1, 1, category, problem, expect, tried, hypo];

      db.one('INSERT INTO tickets("status", "title", "created_at", "student_id", "fellow_id", "closer_id", "category", "problem", "expect", "tried", "hypo") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', ticketInputs)
        .then((data) => {
          res.locals.newTicket = data;
          return next();
        })
        .catch(err => console.error(err));
    };


    db.any('SELECT * FROM users WHERE _id=$1', [studentID])
      .then((data) => {
        res.locals.studentFullName = `${data[0].first_name} ${data[0].last_name}`;
      })
      .then(() => createTicket())
      .catch(err => console.error(err));

  //   db.any('SELECT * FROM users WHERE first_name=$1', [firstNameFellow])
  //     .then((data) => {
  //       console.log('fellow: ', data[0]._id);
  //       res.locals.fellowID = data[0]._id;
  //       console.log(res.locals.fellowID);
  //     })
  //     .then(() => createTicket())
  //     .catch(err => console.error(err));
  },

};
