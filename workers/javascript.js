let dumps = JSON.stringify;

let sendMessage = (name, message) => {
  self.postMessage(dumps({
    type: name,
    data: message
  }));
}

let run = source => {
  let console = {
    log: function (...args) {
      args.forEach(output => (
        sendMessage('stdout', dumps(output))
      ));
      sendMessage('stdout', '\n');
    }
  }

  try {
    eval(source);
  } catch (e) {
    sendMessage('stderr', {
      type: e.name,
      description: String(e)
    });
  }
  sendMessage('exit');
}

self.addEventListener('message', (e) => run(e.data));
