import deferred from 'deferred';

export function interpret(source, stdout, stderr, flush,
                          worker, parsingErrors) {
  let delayed = deferred();
  var flushScreen = true;

  const handleWrite = (data) => {
    delayed.promise().then(_ => stdout(data));
  }

  const handleError = (data) => {
    let writeError = _ => stderr(data.description);
    if (parsingErrors.indexOf(data.type) > -1) {
      writeError();
      flushScreen = false;
    } else {
      delayed.promise().then(writeError);
    }
  }

  const handleExit = _ => {
    if (flushScreen) {flush();}
    delayed.resolve();
    disconnect();
  }

  const handleMessage = (e) => {
    let action = JSON.parse(e.data);
    let handler = {
      'stdout': handleWrite,
      'stderr': handleError,
      'exit': handleExit
    }[action.type];
    handler(action.data);
  }

  const connect = _ => (
    worker.addEventListener('message', handleMessage)
  );

  const disconnect = _ => (
    worker.removeEventListener('message', handleMessage)
  );

  connect();
  
  worker.postMessage(source);
}