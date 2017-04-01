import _ from "underscore";

import { SAVE_FILE, CREATE_FILE, DELETE_FILE, OPEN_FILE } from 'actions/files';

const initialState = {
  'hello.py': `
print 'selam, naber?'
print 'selam, naber?'
print 'selam, naber?'
print 'selam, naber?'
print 'selam, naber?'
print 'selam, naber?'
print 'selam, naber?'
print {
  str(i): i * 'selam' for i in range(1, 10)
}
`.trim(),
  'deneme.py': 'print "deneme";',
  'lists.py': 'print [1, 2, 3, 4];',
};

export function files(state = initialState, action) {
  switch (action.type) {
  case SAVE_FILE:
    return _.assign({}, state, {
      [action.path]: action.text
    });

  case DELETE_FILE:
    return _.omit(state, action.path)

  case CREATE_FILE:
    return _.assign({}, state, {
      [action.path]: action.text
    });
  
  default:
    return state;
  }
};

export function currentFile(state = 'hello.py', action) {
  switch (action.type) {
    case OPEN_FILE:
      return action.path;
    default:
      return state;
  }
}