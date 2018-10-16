
import * as types from '../constants/actionTypes';

const initialState = {};

const ticketsReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.CREATE_TICKET:
      {

        const newTicket = {

        }
        return {
        }


      }

    default:
      return state;
  }
};

export default ticketsReducer;