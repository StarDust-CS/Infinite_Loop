
import * as types from '../constants/actionTypes';
import * as forms from '../forms';

const initialState = {
  userInfo: forms.blankUser,
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.LOG_IN: {
      //Copy initial state
      console.log('user payload', action.payload)
      const newState = JSON.parse(JSON.stringify(state));
      //update state with loggedin username and usertoken
      newState.userInfo = Object.assign({}, action.payload.user )
     
      //update state
      return {
        ...state,
        userInfo: newState.userInfo
      }
    }

    default:
      return state;
  }
};

export default usersReducer;