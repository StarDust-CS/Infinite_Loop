
import * as types from '../constants/actionTypes';

const initialState = {
  user: {}, 
  loggedInUser: '',
  userToken: '',
  allTickets: [], 
  openTickets: [], 

};

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.REGISTER_USER:
      { 
        //Copy initial state
        const newState = Object.assign({}, state); 
        //create new user 
        newState.user = payload.user;
        //update state
        return {
          ...state, 
          user: newState.user,
        }

      }
    case types.LOG_IN: {
        //Copy initial state
        const newState = Object.assign({}, state); 
        //update state with loggedin username and usertoken
        newState.loggedInUser = payload.user.username;
        newState.userToken = payload.user.session;

        //update state
        return {
          ...state, 
          loggedInUser: newState.loggedInUser, 
          userToken: newState.userToken,
        }
    }

    case types.GET_USER_BY_ID: {
      //Copy initial state
      const newState = Object.assign({}, state); 
      //create new user 
      newState.user = payload.user;
      //update state
      return {
        ...state,  
        user: newState.user, 
      }
  }

    default:
      return state;
  }
};

export default usersReducer;