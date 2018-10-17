const bcrypt = require('bcrypt');
const db = require('../postgresql.js');

const SALT_WORK_FACTOR = 10;

module.exports = {
  /**
    * creates new user record
    * @param { Object } req request object
    * @param { object } res response object
    * @param { function } next function to go to next middleware
    */

  createUser(req, res, next) {
    const userInfo = req.body;
    const {
      firstName,
      lastName,
      email,
      password,
      cohort,
      role,
    } = userInfo;

    const userInputs = [firstName, lastName, email, password, cohort, role];

    const addNewUser = () => {
      db.one('INSERT INTO users("first_name", "last_name", "email", "password", "cohort", "role") VALUES($1, $2, $3, $4, $5, $6) RETURNING *', userInputs)
        .then((data) => {
          const { _id, first_name, last_name, role } = data;
          res.locals.newUser = { _id, first_name, last_name, role };
          console.log(res.locals.newUser);
          return next();
        })
        .catch(err => console.error(err));
    };

    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(password, salt))
      .then((hash) => { userInputs[3] = hash; })
      .then(() => addNewUser())
      .catch(err => console.error(err));
  },

  /**
 * Checks to see if user exists in the database
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - passes req and res to the next middleware
 */

  checkEmailExists(req, res, next) {
    const { email } = req.body;

    db.any('SELECT * FROM users where email=$1', [email])
      .then((data) => {
        if (data[0]) res.send({ msg: 'email already exists' });
        else return next();
      })
      .catch(err => console.error(err));
  },

  /**
   * Checks to see if user email/pass combo is valid
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - passes req and res to the next middleware
   */

  verifyUser(req, res, next) {
    const { email, password } = req.body;
    const userInputs = [email, password];

    db.any('SELECT * FROM users WHERE email=$1', userInputs)
      .then((data) => {
        const user = data[0];
        bcrypt.compare(password, user.password, (error, resolve) => {
          if (resolve) {
            const { _id, first_name, last_name, role } = user;
            res.locals.verifiedUser = { _id, first_name, last_name, role };
            return next();
          }
          return res.status(400).send({ msg: 'incorrect password' });
        });
      })
      .catch(err => console.error(err));
  },
};
