import 'relaxed-json';

export function parseOrFallback(output, fallback) {
	try {
		return RJSON.parse(output);
	} catch (e) {
		return fallback(output);
	}
}
