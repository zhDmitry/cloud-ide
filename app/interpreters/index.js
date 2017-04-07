import {python} from 'interpreters/python';
import {ruby} from 'interpreters/ruby';
import {brainfuck} from 'interpreters/brainfuck';
import {getExtension} from 'helpers';
import * as constants from 'interpreters/constants'

export const mapping = {
  [constants.PYTHON]: python,
  [constants.RUBY]: ruby,
  [constants.BRAINFUCK]: brainfuck,
}

export function getInterpreter(currentFile,
                               fallback=mapping.py) {
  let ext = getExtension(currentFile);
  return mapping[ext] || fallback;
}
