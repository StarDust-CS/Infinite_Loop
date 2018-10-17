// initialize connection with PostgreSQL database
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const userController = require('./controller/userController');
const postController = require('./controller/postController');
const cookieController = require('./controller/cookieController');
const ticketController = require('./controller/ticketController');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
/* ROUTING ON: User */
// app.get('/',
//   cookieController.setCookie,
//   (req, res) => {
//     res.status(200).send({ msg: 'cookie created ' });
//   });

/* ROUTING ON: User log in */
app.post('/login',
  userController.verifyUser,
  // cookieController.setSSIDCookie,
  // set ssid
  (req, res) => {
    res.status(200).json(res.locals.verifiedUser);
  });

/* ROUTING ON: User sign up */
app.post('/signup',
  userController.checkEmailExists,
  userController.createUser,
  // cookieController.setSSIDCookie,
  // set ssid
  (req, res) => {
    res.status(200).json(res.locals.newUser);
  });

/* ROUTING ON: User submits help ticket */
app.post('/ticket',
  ticketController.addTicket,
  (req, res) => {
    res.status(200).json(res.locals.newTicket);
  });

// below unchanged from scratch project

app.use(express.static(__dirname + '/../../dist'));

app.use((err, req, res, next) => {
  res.status(400).send(err);
});

//this needs to be exported to userController.test in order to run tests
module.exports = app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
