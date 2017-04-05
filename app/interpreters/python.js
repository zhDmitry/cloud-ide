import {interpret} from 'interpreters/interpreter';

export function python(...args) {
  return interpret(
    ...args, 
    window.workers.python,
    ['ParseError', 'TokenError']
  )
}