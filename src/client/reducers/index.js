import { combineReducers } from 'redux';

// import all reducers here
import usersReducer from './usersReducer';
import ticketsReducer from './ticketsReducers';



// combine reducers
const reducers = combineReducers({
  users: usersReducer,
  tickets: ticketsReducer,
});

// make the combined reducers available for import
export default reducers;
