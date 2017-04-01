import React from 'react';
import CodeMirror from 'react-code-mirror';

import 'codemirror/mode/python/python';

class CodeEditor extends React.Component {

  constructor() {
    super()
    this.state = {
      buffer: null
    };
  }

  componentDidMount() {
    let instance = this.refs.codemirror.editor;
    instance.setOption('lineNumbers', true);
  }

  componentWillReceiveProps(next) {
    this.setState({
      buffer: next.value
    });
  }

  handleChange(event) {
    const buffer = event.target.value;

    if (this.props.autoSave) {
      // todo: debounce
      this.props.onSave(buffer);
    }

    this.setState({
      buffer: buffer
    });

    this.props.onChange();
  }

  render() {
    let block = "code-screen";
    return (
      <CodeMirror
        ref={"codemirror"} 
        className={block + "__editor-wrapper"}
        theme="dracula"
        defaultValue={this.props.value}
        value={this.state.buffer}
        onChange={this.handleChange.bind(this)} />
    );
  }

  getBuffer() {
    return this.state.buffer || this.props.value;
  }
}

export default CodeEditor;