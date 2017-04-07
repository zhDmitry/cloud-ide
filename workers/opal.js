Opal.load('opal-parser');

let sendMessage = (name, message) => {
  self.postMessage(JSON.stringify({
    type: name,
    data: message
  }));
}

let run = (source) => {
  Opal.gvars.stdout.write_proc = output => {
    sendMessage('stdout', output);
    sendMessage('stdout', "\n");
  }

  try {
    Opal.eval(source);
  } catch (e) {
    sendMessage('stderr', {
      exception: e.name,
      description: e.message
    });
  }
  sendMessage('exit');
}

self.addEventListener('message', (e) => run(e.data));