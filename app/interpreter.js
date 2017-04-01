export function readModule(module) {
  return Sk.builtinFiles["files"][module];
}

export function interpret(source, stdout, stderr) {
	Sk.configure({
  	read: readModule,
  	output: stdout
  });
  try {
    Sk.importMainWithBody("<stdin>", false, source);
  } catch (e) {
    stderr(e);
    throw e;
  }
}
