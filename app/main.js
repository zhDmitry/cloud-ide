import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from 'components/App';
import rootReducer from 'reducers';
import { logger } from 'middleware/logger'

import jsonic from 'jsonic'

window.jsonic = jsonic

let createStoreWithMiddleware = applyMiddleware(
	//logger,
	thunkMiddleware
)(createStore);

let store = createStoreWithMiddleware(rootReducer);

console.log(store.getState())

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>, 
  document.body
);

// Here we put our React instance to the global scope. Make sure you do not put it 
// into production and make sure that you close and open your console if the 
// DEV-TOOLS does not display
window.React = React; 
