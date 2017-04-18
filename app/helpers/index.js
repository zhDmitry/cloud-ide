import 'relaxed-json';
import _ from 'underscore';

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
