import {python} from 'interpreters/python';
import {ruby} from 'interpreters/ruby';
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
