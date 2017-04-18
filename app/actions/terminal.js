export const WRITE = 'WRITE';
export const ERROR = 'ERROR';
export const BREAK = 'BREAKLINE';
export const FLUSH = 'FLUSH';

export function write(chunk) {
  if (chunk.charCodeAt() === 10) {
    return breakLine();
  }
  return { type: WRITE, chunk };
}

export function breakLine() {
  return { type: BREAK };
}

export function error(line) {
  return { type: ERROR, line };
}

export function flush() {
  return { type: FLUSH };
}
