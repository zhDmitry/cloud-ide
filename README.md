### Fil
Live coding in your browser with your favourite language.

<http://fatiherikli.github.io/fil/>

![fil](http://i.imgur.com/ATdVU2O.png)

### Features

- Currently supports Python, Ruby, and Brainfuck
- Runs on web workers.
- Uses localStorage API for your changes.

### Implementation

- Uses Skulpt for Python interpreter.
- Uses Opal for Ruby interpreter.
- Built with React and Redux.

### Todo
- Languages
	- LiveScript
	- SibilantJS or LispyScript
	- Elm-lang
	- Any language you want
- Build electron package.

### Development

First of all, clone the repository, and install NPM. After that, run the following commands.

```
$ npm install
$ bower install
$ gulp build
```

Now you can open `index.html` in your browser. Also you can run `gulp watch` command to listen and compile your changes.

### Adding new interpreter

Fil speaks with web workers to interpret source code. Fil's interpreter workers should listen `message` event for source code, and should response with stringified JSON object for the stream of running program with `message` event. 

The message should be plain string. Example:

```ruby
puts "hey".upcase
```

And the response should be a stringified object with `type` and `data` keys:

```javascript
JSON.stringify({
    type: "stdout",
    data: "HEY"
})
```

The key of the object may be:

key          | description
------------ | -------------
stdout | To print to the console
stderr | To show warning message
exit | To finish program


Lets create our worker. 

```javascript
// workers/markdown.js 
let sendMessage = (name, message) => {
  self.postMessage(JSON.stringify({
    type: name,
    data: message
  }));
}

let run = source => {
  var parser = new Markdown(),
      output;
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

self.addEventListener('message', (e) => run(e.data));
```

After then, we should define this worker in `/interpreters.yaml`. 

```yaml
...
markdown:
  description: "Markdown"
  extension: "md"
  workerPath: "build/markdown.worker.js"
  editorMode: "markdown"
  includes:
  	- '{bowerPath}markdown-parser/src/markdow.min.js'

```

Configuration object may contains the following values:

key          | description
------------ | -------------
description | Name of your interpreter that will shown on the console.
extension | File extensions will associated with the interpreter.
workerPath | Worker file. This file will be generated with `gulp buildWorkers` command.
editorMode | The mode of ACE Editor.
includes |  The scripts will be concatenated with your worker.
parsingErrors | To keep apart the syntax errors and internal errors of interpreter.

Now we can build our new interpreter.

	$ gulp buildWorkers

	Using gulpfile ~/projects/fil/gulpfile.js
	Starting 'buildWorkers'...
	Finished 'buildWorkers' after 29 ms

That's it.




