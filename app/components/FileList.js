import _ from 'underscore';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {createFile, renameFile, openFile} from 'actions/files';

class FileRenameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    };
  }

  componentDidMount() {
    React.findDOMNode(this.refs.fileName).select();
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onRename(this.state.path);
  }

  handleChange(event) {
    this.setState({
      path: event.target.value
    });
  }

  render() {
    const {block} = this.props;
    return (
      <form block={block + "__rename-form"}
            onSubmit={this.onSubmit.bind(this)}>
        <input 
          value={this.state.path}
          ref="fileName"
          onChange={this.handleChange.bind(this)} />
      </form>
    );
  }
}

class FileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rename: props.rename
    };
  }
  
  handleFileRename(event) {
    const {files, dispatch} = this.props;
    this.setState({rename: true});
    event.preventDefault();
  }

  handleClick(event) {
    const {path} = this.props;
    this.props.onOpenFile(path);
    event.preventDefault();
  }

  renameFile(newPath) {
    const {dispatch} = this.props;
    dispatch(renameFile(this.props.path, newPath));
    dispatch(openFile(newPath));
    this.setState({rename: false});
  }

  render() {
    const {path, current, block} = this.props;
    return (
      <li className={classNames({
        [block + "__item"]: true,
        [block + "__item--current"]: path == current
      })}>
        <a href="#" 
           onDoubleClick={this.handleFileRename.bind(this)}
           onClick={this.handleClick.bind(this)}>
          {this.state.rename && (
            <FileRenameForm 
                block={block}
                path={path}
                onRename={this.renameFile.bind(this)} />
          )}
          {!this.state.rename && path}
        </a>
      </li>
    );
  }
}

class FileList extends React.Component {
  constructor() {
    super();
    this.state = {
      renamingPath: null
    };
  }

  handleNewFileButtonClick(event) {
    const {files, dispatch} = this.props;
    const fileName = 'module.py';
    dispatch(createFile(fileName))
    this.setState({renamingPath: fileName});
    event.preventDefault();
  }

  render() {
    const {files, current, dispatch} = this.props;
    const block = "file-list";
    return (
      <ul className={block}>
        {_.keys(files).map(
          (path) => <FileItem
                      key={path}
                      block={block}
                      path={path}
                      rename={this.state.renamingPath === path} 
                      {...this.props} />
        )}
        <li className={classNames(block + "__item", 
                                  block + "__item--new")}>
          <a onClick={this.handleNewFileButtonClick.bind(this)}
             href="#" >+</a>
        </li>
      </ul>
    );
  }

}

function select(state) {
  return {
    files: state.files
  };
}

export default connect(select)(FileList);