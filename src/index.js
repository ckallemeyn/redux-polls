import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index.js';
import middleware from './middleware/index.js';

const store = createStore(reducers, middleware);

console.log('found the state', store.getState());

ReactDOM.render(
  <Provider store={store} >
    <App />
  </ Provider>, document.getElementById('root'))