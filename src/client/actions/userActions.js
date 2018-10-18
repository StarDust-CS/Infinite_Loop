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

 

/** register 
 * dispatch to reducer --> update store
 * async call to db to update db
 * 
*/
const registerUser = (user) => ({
  type: types.REGISTER_USER,
  payload: logInFormFields,
})

const userLogin = (user) => ({
  type: types.LOG_IN,
  payload: user

})

const getUser = (user) => ({
  type: types.GET_USER_BY_ID,
  payload: user

})


export function register(event, logInFormFields ) {
  return dispatch => {
    // to users reducer to update state with new user

    //async call to db
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logInFormFields) /** */

    }).then(res => res.json())
      .then(data => {
          dispatch(registerUser(logInFormFields));
          console.log('SUCCESSFULL REGISTRATION')
          console.log(data)
      }).catch(err => console.error(err));
    }
  }

  export function logIn(userInfo) {
  return dispatch => {
    //async call to server for authentication 
    //async call to db
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)

    }).then(res => res.json())
      .then(response => {
        console.log('SUCCESSFULL LOGIN')
        dispatch(userLogin(response))/**respond with username and session token */
      }).catch(err => console.error(err));
  }

}

export function getUserById(id) {
  return dispatch => {
    //async call to db
    fetch('http://localhost:3000/userId', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        dispatch(getUser(data))
      })
  }
}









