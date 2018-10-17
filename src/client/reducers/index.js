import { combineReducers } from 'redux';

// import all reducers here
import usersReducer from './usersReducer';
import formsReducer from './formsReducer';



// combine reducers
const reducers = combineReducers({
  
  users: usersReducer,
  forms: formsReducer
});

// make the combined reducers available for import
export default reducers;
