import _ from 'underscore';
import React from 'react';
import {connect} from 'react-redux';

import Header from 'components/Header';
import CodeEditor from 'components/CodeEditor';
import Console from 'components/Console';
import FileList from 'components/FileList'

import {openFile, saveFile} from 'actions/files';
import {writeLine, flush, runScript} from 'actions/terminal';
import {write, error} from 'actions/terminal';
import {byFileName} from 'interpreters';

class App extends React.Component {
  /**
   * States Injected:
   * files: Current file list
   * currentFile: Current file name
   * terminal: The terminal instance
   * preferences: the user preference
   */
  componentDidMount() {
    this.handleRun();
    this.lazyRun = _.debounce(this.handleRun, 300);
  }
  
  handleRun() {
    const {dispatch, currentFile} = this.props;
    const buffer = this.refs.editor.getBuffer();
    const interpret = byFileName(currentFile);

    interpret(
      buffer, 
      (out) => dispatch(write(out)),
      (err) => dispatch(error(err)),
      (clr) => dispatch(flush())
    );
  }
  
  handleSave(source) {
    const {dispatch, currentFile} = this.props;
    dispatch(saveFile(currentFile, source));
  }

  handleEditorChange() {
    let {preferences} = this.props,
        source = this.refs.editor.getBuffer();
    if (preferences.liveCoding && source) {
      this.lazyRun();
    };
  }

  render() {
    const block = "editor";
    const {dispatch, files, currentFile, terminal} = this.props;

    return (
      <div className={block}>
        <div className={block + "__code-screen"}>
          <Header>
            <FileList 
              files={files}
              onOpenFile={path => dispatch(openFile(path))}
              current={currentFile} />
          </Header>
          <CodeEditor 
            ref="editor"
            currentFile={currentFile}
            autoSave={true}
            onChange={this.handleEditorChange.bind(this)}
            onSave={this.handleSave.bind(this)} 
            value={files[currentFile]} />
        </div>
        <div className={block + "__console"}>
          <Console lines={terminal.lines} 
                   error={terminal.error}
                   ref="console"
                   onRun={this.handleRun.bind(this)} />
        </div>
      </div>
    );
  }
}

function appState(state) {
  return {
    files: state.files,
    currentFile: state.currentFile,
    terminal: state.terminal,
    preferences: state.preferences
  };
}

export default connect(appState)(App);
