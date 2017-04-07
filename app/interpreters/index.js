import _ from 'underscore';
import {getExtension} from 'helpers';
import YAML from 'yamljs';
import interpret from 'interpreters/interpret';

var interpreters = YAML.parse(require('interpreters.yaml'));
var workers = {};

export function spawnWorker(name) {
  if (workers[name]) {
    return workers[name];
  }

  let interpreter = interpreters[name];
  let workerPath = interpreter.workerPath;
  let instance = new Worker(workerPath);
  workers[name] = instance;
  return instance;
}

export function bundle(key) {
  return _.assign({}, interpreters[key], {
    name: key
  });
}

export function getDefault() {
  for (let key in interpreters) {
    if (interpreters[key].isDefault) {
      return bundle(key);
    }
  }
}

export function byExtension(extension) {
  for (let key in interpreters) {
    let interpreter = interpreters[key];
    if (interpreter.extension == extension) {
      return bundle(key);
    }
  }
  
  return getDefault();
}

export function byFileName(path) {
  let interpreter = byExtension(getExtension(path));
  return getInterpreter(interpreter);
}

export function getInterpreter(definition) {
  let worker = spawnWorker(definition.name);
  let extra = [worker, definition.parsingErrors];
  return (...args) => interpret(...args, ...extra);
}
