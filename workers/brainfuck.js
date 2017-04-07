function sendMessage(name, message) {
  self.postMessage(JSON.stringify({
    type: name,
    data: message
  }));
}

function run(source) {
  var parser = new BrainfuckParser(),
      output = "";
  try {
    output = parser.parse(source)
    sendMessage('stdout', output);
  } catch (e) {
    sendMessage('stderr', {
      exception: 'ParseError',
      description: String(e)
    });
  }
  sendMessage('exit');
}

self.addEventListener('message', function(e) {
  run(e.data);
}, false);
