import { getInitialData } from '../utils/api.js';
import { receivePolls } from './polls.js';
import { receiveUsers } from './users.js';
import { setAuthedUser } from './authedUser.js';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'dan_abramov';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, polls }) => {
        dispatch(receiveUsers(users));
        dispatch(receivePolls(polls));
        dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading());
      })
  }
}

