import _ from 'underscore';
import React from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';

import Header from 'components/Header';
import CodeEditor from 'components/CodeEditor';
import Console from 'components/Console';
import FileList from 'components/FileList'

import {openFile, saveFile, createFile} from 'actions/files';
import {writeLine, flush, runScript} from 'actions/terminal';
import {write, error} from 'actions/terminal';
import {byFileName} from 'interpreters';
import {loadPermalink} from 'helpers';

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
    this.loadPermalink();
  }
  
  handleRun() {
    const {dispatch, currentFile} = this.props;
    const buffer = this.refs.editor.getBuffer();
    const interpret = byFileName(currentFile);

    if (buffer) {
      interpret(
        buffer, 
        (out) => dispatch(write(out)),
        (err) => dispatch(error(err)),
        (clr) => dispatch(flush())
      );
    }
  }

  loadPermalink() {
    const {hash} = window.location,
          {dispatch} = this.props;

    if (hash) {
      let bundle = loadPermalink(hash),
          {path, source} = bundle;
      dispatch(createFile(path, source));
      dispatch(openFile(path));
    }
  }
  
  handleSave(source) {
    const {dispatch, currentFile} = this.props;
    dispatch(saveFile(currentFile, source));
  }

  handleEditorChange() {
    let {preferences} = this.props,
        {editor} = this.refs;
    if (preferences.liveCoding && editor) {
      this.lazyRun();
    };
  }

  isEmbedMode() {
    const {search} = window.location,
          parsed = queryString.parse(search);
    return !!parsed.embed;
  }

  render() {
    const block = "editor";
    const {dispatch, files, currentFile, terminal} = this.props;
    const embedMode = this.isEmbedMode();

    return (
      <div className={classNames({
        [block]: true,
        [block + "--embed"]: embedMode
      })}>
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
