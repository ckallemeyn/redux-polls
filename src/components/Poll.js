import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPercentage } from '../utils/helpers.js';
import { handleAddAnswer } from '../actions/answers.js';

const getVoteKeys = () => ['aVotes','bVotes','cVotes','dVotes'];

class Poll extends Component {
  handleAnswer = (answer) => {
    const { poll, authedUser } = this.props;
    this.answered = true;

    this.props.dispatch(handleAddAnswer({
      authedUser,
      answer,
      id: poll.id
    }))
  }

  render() {
    console.log('found the props', this.props);
    if (this.props.poll === null) {
      return <p> This poll does not exist </p>
    }
    const { poll, vote, authorAvatar } = this.props;

    const totalVotes = getVoteKeys().reduce((total, key) => {
      return total + poll[key].length
    }, 0)

    return (
      <div className='poll-container'>
        <h1 className='question'>
          {poll.question}
        </h1>
        <div className='poll-author'>
          by <img src={authorAvatar} alt="Author's avatar"/>
        </div>
        <ul>
          {['aText','bText','cText','dText'].map((key, i) => {
            const count = poll[key[0] + 'Votes'].length
            return (
              <li key={key} onClick={() => {
                if (vote === null && !this.answered) {
                  this.handleAnswer(key[0])}
                }
              }
                className={`option ${vote === key[0] ? 'chosen' : ''}`}>
                {vote === null
                ? poll[key]
                : <div className='result'>
                  <span>{poll[key]}</span>
                  <span>{getPercentage(count, totalVotes)}% ({count})</span>
                </div>
                }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, polls, users }, { match }) {
  const { id } = match.params;
  const poll =  polls[id];

  if (!poll) {
    return {
      poll: null
    }
  }

  const vote = getVoteKeys().reduce((vote, key) => {
    if (vote !== null) {
      return vote[0]
    }

    return poll[key].includes(authedUser) ? key : vote;
  }, null)

  return {
    poll,
    vote,
    authedUser,
    authorAvatar: users[poll.author].avatarURL
  }
}

export default connect(mapStateToProps)(Poll);