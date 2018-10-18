// initialize connection with PostgreSQL database
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const userController = require('./controller/userController');
const postController = require('./controller/postController');

app.use(bodyParser.json());
app.use(cors());

app.get('/login',
  (req, res) => {
    res.render(/* Path to login page */);
  });

app.get('/signup',
  // userController.createUser,
  (req, res) => {
    res.render(/* Path to signup page */);
  });

app.post('/login',
  userController.verifyUser,
  // set ssid
  // set cookie
  (req, res) => {
    res.status(200).send({ msg: 'you logged in' });
    // res.render(/* Path to user dashboard page */);
  });

app.post('/signup',
  userController.checkEmailExists,
  userController.createUser,
  // set ssid
  // set cookie
  (req, res) => {
    res.status(200).send({ msg: 'signed up ok' });
    //res.render(/* Path to main dashboard page */);
  });
 

app.use(express.static(__dirname + '/../../dist'));

app.use((err, req, res, next) => {
  res.status(400).send(err);
});

//this needs to be exported to userController.test in order to run tests
module.exports = app.listen(3000, () => {
  console.log('Listening on port 3000...');
});



