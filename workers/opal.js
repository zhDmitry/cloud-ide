Opal.load('opal-parser');

function sendMessage(name, message) {
  self.postMessage(JSON.stringify({
    type: name,
    data: message
  }));
}

function run(source) {
  Opal.gvars.stdout.write_proc = function (output) {
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

self.addEventListener('message', function(e) {
  run(e.data);
}, false);
