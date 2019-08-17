import { combineReducers } from 'redux';
import polls from './polls.js';
import users from './users.js';
import authedUser from './authedUser.js';
import { loadingBarReducer } from 'react-redux-loading';

const reducers = combineReducers({
  polls,
  users,
  authedUser,
  loadingBar: loadingBarReducer
});

export default reducers;