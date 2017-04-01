import _ from "underscore";

import { SET_PREFERENCE } from 'actions/preferences';

const initialState = {
  liveCoding: true
};

export function preferences(state = initialState, action) {
  switch (action.type) {
    case SET_PREFERENCE:
      return _.assign({}, state, {
        [action.key]: action.value
      });

    default:
      return state;
  }
}