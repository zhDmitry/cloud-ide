import deferred from 'deferred';
import RJSON from 'relaxed-json';
import axios from 'axios';
import { stringify } from 'query-string';

export default function interpret(source, stdout, stderr, flush, meta, definition) {
  axios.post('http://localhost:3000/build', {
    code: source,
    meta: {
      ...meta,
      ...definition
    }
  }).then(el => {
    flush();
    stdout(el.data.result)
  }).catch(el => {
    stderr(JSON.stringify(el.response.data.result));
  })
}