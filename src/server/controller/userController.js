const db = require('../postgresql.js');

module.exports = {
  /**
    * creates new user record and returns the created record
    * @param { Object } req request object 
    * @param { object } res response object
    * @param { function } next function to go to next middlewear 
    */

  createUser(req, res, next) {
    // check if all boxes are filled before proceeding
    const userInfo = req.body;
    const inputs = Object.values(userInfo);
    const { lastName, firstName, email, password, role, cohort } = req.body;

    // check to see all boxes are filled out
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i] === '') res.send({ error: 'one or more boxes are empty' });
    }

    // check code against the role of user
    if (req.body.role === 'junior' && req.body.code !== '24') {
      res.send({ error: 'your code does not work with your role' });
    } else if (req.body.role === 'senior' && req.body.code !== '23') {
      res.send({ error: 'your code does not work with your role' });
    } else if (req.body.role === 'fellow' && req.body.code !== 'FE') {
      res.send({ error: 'your code does not work with your role' });
    } else if (req.body.role === 'admin' && req.body.code !== 'GOD') {
      res.send({ error: 'your code does not work with your role' });
    }

    console.log('fn: ', firstName);

    db.one('INSERT INTO users("first_name", "last_name", "email", "password", "cohort", "role") VALUES($1, $2, $3, $4, $5, $6)',
      [firstName, lastName, email, password, cohort, role])
      .then((data) => {
        console.log(data);
        res.locals.newUser = data;
        return next();
      })
      .catch(err => console.error(err));
  },

  // createUser(req, res, next) {
  //   //check request has correct body format
  //   if (Object.keys(req.body).length === 2 && req.body.name && req.body.role) {
  //     //if role equals to user, create user 
  //     if (req.body.role === 'student') {
  //       db.one("INSERT INTO student(name) VALUES ($1) RETURNING *", req.body.name)
  //         .then(data => {
  //           res.locals.data = data;
  //           return next();
  //         })
  //         .catch(err => {
  //           console.log('ERROR: ', err)
  //           return next(err);
  //         });
  //     } else {
  //       // if not user create helper
  //       db.one("INSERT INTO helper(name) VALUES ($1) RETURNING *", req.body.name)
  //         .then(data => {
  //           res.locals.data = data;
  //           return next();
  //         })
  //         .catch(err => {
  //           console.log('ERROR: ', err)
  //           return next(err);
  //         });
  //     }

  //   } else {
  //     return res.status(400).send();
  //   }

  // },
  /**
   * Checks to see if user is in the database
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - passes req and res to the next middleware
   */

  verifyUser(req, res, next) {
    const { email, password } = req.body;
    const { length } = Object.values(req.body);

    db.any('SELECT * FROM users WHERE email = $1', [email])

      // results return as array of object (unique email, so 0)
      .then((data) => {

        // if routing from the login page...
        if (length === 2) {
          // if user doesn't exist in db, reroute to sign up
          if (!data[0]) res.redirect('/signup');

          // if email is valid, but password is invalid, retry login
          else if (data[0].password !== password) res.redirect('/login');

          // valid creds! now store unique user in response
          const [user] = [...data];
          res.locals.user = user;
          return next();

          // otherwise, routing from sign up
        } else {
          // if email exists in db, send back error msg.
          if (data[0]) res.status(400).send({ error: "email address already exists" });
          // if not, move on to createUser
          else return next();
        }
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  },
};


/** 
 * Old Code
 * 
  // verifyUser(req, res, next) {
  //   db.any('SELECT name FROM student WHERE name = $1', req.body.name)
  //   .then((data) => {
  //     if(data.length === 0) {
  //       return next();
  //     } else{
  //       res.locals.data = data;
  //       return next();
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('ERROR: ', err)
  //     next(err);
  //   })
  // },
**/