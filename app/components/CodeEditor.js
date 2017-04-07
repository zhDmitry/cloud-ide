import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/mode/ruby';
import 'brace/theme/tomorrow_night';

import {getExtension} from 'helpers';
import {byExtension} from 'interpreters';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      buffer: props.value
    };
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

  getMode(extension) {
    return byExtension(extension).editorMode;
  }

  render() {
    let block = "code-screen",
        fileName = this.props.currentFile,
        extension = getExtension(fileName),
        mode = this.getMode(extension);
    return (
      <AceEditor
        width={"auto"}
        height={"100%"}
        fontSize={17}
        mode={mode}
        theme="tomorrow_night"
        ref={"editor"} 
        showGutter={false}
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