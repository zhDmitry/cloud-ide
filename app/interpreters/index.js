import _ from 'underscore';
import { getExtension } from 'helpers';
import YAML from 'yamljs';
import interpret from 'interpreters/interpret';

var interpreters = YAML.parse(require('interpreters.yaml'));
var workers = {};

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
  console.log(definition);
  return (...args) => interpret(...args, definition);
}
