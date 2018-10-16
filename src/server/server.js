// initialize connection with PostgreSQL database
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userController = require('./controller/userController');
const postController = require('./controller/postController');

app.use(bodyParser.json());

app.get('/login', (req, res) => {
  res.status(200).send('now in GET /login');
});

app.get('/signup', (req, res) => {
  res.status(200).send('now in GET /signup');
});

app.post('/login',
  userController.verifyUser,
  (req, res) => {
    res.status(200).send('Successful login');
  },
);

app.post('/signup',
  userController.verifyUser,

);

// app.post('/createuser',
//   userController.verifyUser,
//   userController.createUser,
//   (req, res) => {
//     res.status(200).json(res.locals.data);
//   }
// )
// app.post('/createpost',
//   postController.createPost,
//   (req, res) => {
//     res.status(200).json(res.locals.data);
//   });
// app.get('/home',
//   postController.getPosts,
//   (req, res) => {
//     res.status(200).json(res.locals.data);
//   });
// app.patch('/status',
//   postController.changeStatus,
//   (req, res) => {
//     res.status(200).json(res.locals.data);
//   });

// below unchanged

app.use(express.static(__dirname + '/../../dist'));

app.use((err, req, res, next) => {
  res.status(400).send(err);
});

//this needs to be exported to userController.test in order to run tests
module.exports = app.listen(3000, () => {
  console.log('Listening on port 3000...');
});



