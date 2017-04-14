import 'relaxed-json';
import _ from 'underscore';

export const dumps = JSON.stringify;
export const loads = JSON.parse;

export function parseOrFallback(output, fallback) {
  if (!_.isString(output)) {
    return output;
  }

  output = output.replace(/=>/g, ':');

  try {
    return RJSON.parse(output);
  } catch (e) {
    return fallback(output);
  }
}

export function getExtension(fileName) {
	let parts = fileName.split(".");
	return parts[parts.length - 1];
}

export function buildPermalink(bundle) {
  let buffer = new Buffer(dumps(bundle)),
      base64 = buffer.toString('base64');
  return `#${base64}`;
}

export function loadPermalink(hash) {
  let source = hash.trimLeft('#'),
      buffer = new Buffer(source, 'base64');
  return loads(buffer.toString());
}
