import deferred from 'deferred';

export function readModule(module) {
  return Sk.builtinFiles["files"][module];
}

export const ParsingErrors = [
  'ParseError', 
  'TokenError'
];

export function interpret(source, stdout, stderr, flush) {
  let delayed = deferred();

  let write = (output) => {
    delayed.promise().then(_ => stdout(output));
  };

  Sk.configure({
    read: readModule,
    output: write
  });

  let flushScreen = true;

  try {
    Sk.importMainWithBody("<stdin>", false, source);
  } catch (e) {
    let writeError = _ => stderr(String(e));
    if (ParsingErrors.indexOf(e.tp$name) > -1) {
      flushScreen = false;
      writeError();
    } else {
      delayed.promise().then(writeError);
    }
  }

  if (flushScreen)
    flush();

  delayed.resolve();
}
