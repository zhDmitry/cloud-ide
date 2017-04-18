import React from 'react';
// import CodeMirror from 'react-code-mirror';

//import 'codemirror/mode/python/python';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/tomorrow_night';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      buffer: props.value
    };
  }

  componentDidMount() {
    // let instance = this.refs.codemirror.editor;
    // instance.setOption('lineNumbers', true);
  }

  componentWillReceiveProps(next) {
    this.setState({
      buffer: next.value
    });
  }

  handleChange(buffer) {
    if (this.props.autoSave) {
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
      <AceEditor
        width={"100%"}
        height={"100%"}
        fontSize={14}
        mode="python"
        theme="tomorrow_night"
        ref={"editor"} 
        className={block + "__editor-wrapper"}
        value={this.state.buffer}
        highlightActiveLine={false}
        editorProps={{
          $blockScrolling: true
        }}
        onChange={this.handleChange.bind(this)} />
    );
  }

  getBuffer() {
    return this.state.buffer || this.props.value;
  }
}

export default CodeEditor;