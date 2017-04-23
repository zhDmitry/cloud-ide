import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';
import persistState from 'redux-localstorage'
import { compose, createStore, applyMiddleware } from 'redux';

const persistedReducers = [
  'files',
  'currentFile',
  'preferences'
];

const createPersistentStore = compose(
  persistState(persistedReducers)
)(applyMiddleware(
  thunkMiddleware
)(createStore));

const store = createPersistentStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;