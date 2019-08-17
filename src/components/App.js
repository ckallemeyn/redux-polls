import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared.js';
import { connect } from 'react-redux';
import Dashboard from './Dashboard.js'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard.js';
import AddPoll from './AddPoll.js';
import Poll from './Poll.js';
import Nav from './Nav.js';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {(loading === true)
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/polls/:id' component={Poll} />
                  <Route path='/add' component={AddPoll} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)