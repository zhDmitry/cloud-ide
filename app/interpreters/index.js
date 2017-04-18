import {interpret as python} from 'interpreters/python';
import {interpret as ruby} from 'interpreters/ruby';
import {getExtension} from 'helpers';
import {PYTHON, RUBY} from 'interpreters/constants'

export const mapping = {
  [PYTHON]: python,
  [RUBY]: ruby
}

export function getInterpreter(currentFile,
                               fallback=mapping.py) {
  let ext = getExtension(currentFile);
  return mapping[ext] || fallback;
}
