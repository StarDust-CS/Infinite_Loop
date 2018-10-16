/**
 * ************************************
 *
 * @module  userActions.js
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes'

export const userActions = {
  logIn,
  register,
  getUserById, 

};

/** register 
 * dispatch to reducer --> update store
 * async call to db to update db
 * 
*/
const registerUser = (user) => (
  type: types.REGISTER_USER,
  payload: user,

})

const userLogin = (user) => ({
  type: types.LOG_IN,
  payload: user

})

const getUser = (user) => ({
  type: types.GET_TICKET_BY_ID,
  payload: user

})


function register(user) {
  return dispatch => {
    // to users reducer to update state with new user

    //async call to db
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: '',
        role: user.role,
        cohort: user.cohort,
        secretCode: user.secretCode
      })

    }).then(res => res.json())
      .then(response => {
        if (response) {
          dispatch(registerUser(user));
          console.log('SUCCESSFULL REGISTRATION')
        }
      })


  function logIn(username, password, remember) {
    return dispatch => {
      //async call to server for authentication 
      //async call to db
      fetch('http://localhost:3000/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({/** needs testing */
          email: email,
          password: password,
          remember: remember

        })

      }).then(res => res.json())
        .then(response => {
          console.log('SUCCESSFULL LOGIN')
          dispatch(userLogin(response))/**respond with username and session token */
        })
    }

  }
  
  function getUserById(id) {
    return dispatch => {
      //async call to db
      fetch('http://localhost:3000/userId', {
        method: 'get',
      })
        .then(response => response.json())
        .then(data => {
          dispatch(getUser(data))
        })
    }
  }
}
}









