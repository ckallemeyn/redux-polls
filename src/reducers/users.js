import { RECEIVE_USERS } from '../actions/users.js';
import { ADD_POLL } from '../actions/polls.js';
import { ADD_ANSWER } from '../actions/answers.js';

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_POLL:
      const poll = action.poll
      const { author, id } = poll

      return {
        ...state,
        [author] : {
          ...state[author],
          polls: state[author].polls.concat([id])
        }
      }
      case ADD_ANSWER :
        const user = state[action.authedUser]

        return {
          ...state,
          [action.authedUser]: {
            ...user,
            answers: user.answers.concat([action.id])
          }
        }
    default:
      return state;
  }
}