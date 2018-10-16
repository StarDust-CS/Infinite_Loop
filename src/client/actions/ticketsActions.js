/**
 * ************************************
 *
 * @module  ticketActions.js
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes'


export const ticketActions = {
  getTicket,
  getAllTickets,
  createTicket

};

const getTicketById = (id) => ({
  type: types.GET_TICKET_BY_ID,
  payload: id

})

const create = (ticket) => ({
  type: types.CREATE_TICKET,
  payload: ticket

})

const getTickets = (data) => ({
  type: types.GET_ALL_TICKETS,
  payload: data

})


function getTicket(id) {
  fetch(`http://localhost:3000/getTicket/`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
    })
      .then(res => res.json())
      .then(response => {
        dispatch(getTicketById(response));
        // console.log('returning ticket', response);
      })
  })
}


function createTicket(ticket) {
  return dispatch => {
    //async call to db
    fetch(`http://localhost:3000/createTicket`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket)
    }).then(res => res.json())
      .then(data => {
        console.log('response from create tickeg', data)
        //dispatch to reducer
        dispatch(create(ticket));
      })
  }
}



function getAllTickets(ticket) {
  return dispatch => {
    //async call to db
    fetch(`http://localhost:3000/createTicket`, {
      method: 'get',
    }).then(res => res.json())
      .then(data => {
        console.log('response from create tickeg', data)
        //dispatch to reducer
        dispatch(getTickets(data));
      });
  }
}


