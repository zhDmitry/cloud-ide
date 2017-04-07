import {interpret} from 'interpreters/interpreter';

export function brainfuck(...args) {
  return interpret(
    ...args, 
    window.workers.brainfuck,
    []
  )
}