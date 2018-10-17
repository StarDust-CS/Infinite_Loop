

// import actionType constants
import * as types from '../constants/actionTypes'


export const showForm = (event) => ({
  type: types.SHOW_FORM,
  payload: event

})

export const updateLogInForm = (event) => ({
  type: types.UPDATE_FORM, 
  payload: event
})

export const updateRegisterForm = (event) => ({
  type: types.UPDATE_REGISTER_FORM, 
  payload: event
})

export const signupChangedHandler = (event) => ({
  type: types.SIGNUP_CHANGED_HANDLER, 
  payload: event
})

export const submitTicket = (event) => ({
  type: types.SUBMIT_TICKET, 
  payload: event
})

export const updateTicketForm = (event) => ({
  type: types.UPDATE_TICKET_FORM, 
  payload: event
})


export const dataToReducer = (data) => ({
  type: types.UPDATE_TICKET_FORM, 
  payload: data
})



function fetchData(id) {
  return dispatch => {
    //async call to db
    fetch('http://localhost:3000/home', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        dispatch(dataToReducer(data))
      }).catch(err => console.error(err));
  }
}

