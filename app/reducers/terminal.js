import _ from "underscore";

import { FLUSH, WRITE, ERROR, BREAK } from 'actions/terminal';

const initialState = {
  lines: [],
  errors: []
};

export function lines(state = [], action) {
  switch (action.type) {
    case WRITE:
      let head = state.slice(0, state.length - 1),
          tail = state[state.length - 1] || [];
      
      return [...head, [...tail, action.chunk]];

    case BREAK:
      return [...state, []];

    default:
      return state;
  }
}

export function terminal(state = initialState, action) {
  switch (action.type) {
  case WRITE:
  case BREAK:
    return _.assign({}, state, {
      lines: lines(state.lines, action)
    });

  case ERROR:
    return _.assign({}, state, {
      errors: [...state.errors, action.line]
    });

  case FLUSH:
    return initialState;

  default:
    return state;
  }
};
