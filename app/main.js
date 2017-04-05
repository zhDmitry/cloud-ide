import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import App from 'components/App';
import rootReducer from 'reducers';
import { logger } from 'middleware/logger'

let createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	//logger
)(createStore);

let store = createStoreWithMiddleware(rootReducer);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>, 
  document.body
);
