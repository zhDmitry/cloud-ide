import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';
import CodeEditor from 'components/CodeEditor';
import Console from 'components/Console';
import FileList from 'components/FileList'

import {openFile, saveFile} from 'actions/files';
import {writeLine, flush, runScript} from 'actions/terminal'


class App extends React.Component {
  componentDidMount() {
    this.handleRun();
    this.lazyRun = _.debounce(this.handleRun, 300);
  }
  
  handleRun() {
    const {dispatch} = this.props;
    const buffer = this.refs.editor.getBuffer();
    dispatch(flush());
    dispatch(runScript(buffer));
  }
  
  handleSave(source) {
    const {dispatch, currentFile} = this.props;
    dispatch(saveFile(currentFile, source));
  }

  handleEditorChange(source) {
    let {preferences} = this.props;
    if (preferences.liveCoding) {
      this.lazyRun();
    };
  }

  render() {
    const block = "editor";
    const {dispatch, files, currentFile, terminal} = this.props;

    return (
      <div className={block}>
          <Header>
            <FileList files={files}
                      onOpenFile={path => dispatch(openFile(path))}
                      current={currentFile} />
          </Header>
          <div className={block + "__code-screen"}>
            <CodeEditor ref="editor"
                        autoSave={true}
                        onChange={this.handleEditorChange.bind(this)}
                        onSave={this.handleSave.bind(this)} 
                        value={files[currentFile]} />
          </div>
          <div className={block + "__console"}>
            <Console lines={terminal.lines} 
                     errors={terminal.errors}
                     ref="console"
                     onRun={this.handleRun.bind(this)} />
          </div>
      </div>
    );
  }
}

function select(state) {
  return {
    files: state.files,
    currentFile: state.currentFile,
    terminal: state.terminal,
    preferences: state.preferences
  };
}

export default connect(select)(App);