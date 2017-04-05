import {interpret} from 'interpreters/interpreter';

export function ruby(...args) {
  return interpret(
    ...args, 
    window.workers.ruby,
    ['SyntaxError', 'RuntimeError']
  )
}
