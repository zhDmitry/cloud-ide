import deferred from 'deferred';

Opal.load('opal-parser');

export function interpret(source, stdout, stderr, flush,
              lineBreak="\n") {

  let delayed = deferred();

  Opal.gvars.stdout.write_proc = (output) => {
    delayed.promise().then(_ => stdout(output));
    delayed.promise().then(_ => stdout(lineBreak));
  }

  let flushScreen = true;
  try {
    Opal.eval(source);
  } catch (e) {
    let writeError = _ => stderr(e.message);
    if (e.name === "SyntaxError") {
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
