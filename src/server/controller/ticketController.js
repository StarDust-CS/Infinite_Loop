
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
      // ticketID : primary key of tickets (aka _id)
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
  },
  // retrieve all tickets
  getTickets(req, res, next) {

    const formatTicket = (ticket) => {
      return {
        ticketID: ticket.ticket_id,
        createdAt: ticket.created_at,
        cohort: ticket.cohort,
        studentFullName: `${ticket.first_name} ${ticket.last_name}`,
        fellowFullName: '',
        closedFullName: '',
        status: ticket.status,
        category: ticket.category,
        title: ticket.title,
        problem: ticket.problem,
        expect: ticket.expect,
        tried: ticket.tried,
        hypo: ticket.hypo,
      };
    };

    db.any('SELECT * FROM tickets JOIN users ON tickets.student_id=users._id')
      .then((data) => {
        const ticketsArr = [];
        console.log('data: ', data);
        data.map(ticket => ticketsArr.push(formatTicket(ticket)));
        return ticketsArr;
      })
      .then((ticketsArr) => {
        console.log('ticketsArr: ', ticketsArr);
        res.locals.ticketArray = ticketsArr;
        return next();
      })
      .catch(err => console.error(err));
  },

  updateTicket(req, res, next) {
    const { status, ticketID, userID } = req.body;

    if (status === 'CLOSED') {
      db.any(`UPDATE tickets SET closer_id=${userID} WHERE ticket_id=${ticketID}`)
        .then(() => next())
        .catch(err => console.error(err));
    } else if (status === 'IN PROGRESS') {
      db.any(`UPDATE tickets SET fellow_id=${userID}, status='In Progress' WHERE ticket_id=${ticketID}`)
        .then(() => next())
        .catch(err => console.error(err));
    }
  },
};
