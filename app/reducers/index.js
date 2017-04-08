import {combineReducers} from 'redux';
import {files, currentFile} from 'reducers/files';
import {terminal} from 'reducers/terminal';
import {preferences} from 'reducers/preferences';

const rootReducer = combineReducers({
  files,
  currentFile,
  terminal,
  preferences
});

export default rootReducer;