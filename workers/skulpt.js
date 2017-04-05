function readModule(module) {
  return Sk.builtinFiles["files"][module];
}

function sendMessage(name, message) {
  self.postMessage(JSON.stringify({
    type: name,
    data: message
  }));
}

function run(source) {
  Sk.configure({
    read: readModule,
    output: function (output) {
      sendMessage('stdout', output);
    }
  });

  try {
    Sk.importMainWithBody("<stdin>", false, source);
  } catch (e) {
    sendMessage('stderr', {
      exception: e.tp$name,
      description: String(e)
    });
  }

  sendMessage('exit');
}

self.addEventListener('message', function(e) {
  run(e.data);
}, false);
