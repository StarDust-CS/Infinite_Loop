const db = require('../postgresql.js');

module.exports = {
  /**
    * creates new user record and returns the created record
    * @param { Object } req request object 
    * @param { object } res response object
    * @param { function } next function to go to next middlewear 
    */

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
   * Checks to see if user is in the database, if not calls createUser()
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - passes req and res to the next middleware
   */

  verifyUser(req, res, next) {
    const { email, password } = req.body;
    db.any('SELECT * FROM users WHERE email = $1', [email])

      // results return as array of object (unique email, so 0)
      .then((data) => {
        // if user doesn't exist in db, reroute to sign up
        if (!data[0]) res.redirect('/signup');
        // if email is valid, but password is invalid, retry login
        else if (data[0].password !== password) res.redirect('/login');
        // upon successful credentials...
        else {
          // store unique user in response
          res.locals.user = data[0];
          return next();
        }
      })
      .catch(err => console.error(err));
  },


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
};
