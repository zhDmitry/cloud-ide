import React from 'react';
import _ from 'underscore';
import classNames from 'classnames';

class FileList extends React.Component {

  handleClick(path, event) {
    event.preventDefault();
    this.props.onOpenFile(path);
  }

  render() {
    const {files, current} = this.props;
    const block = "file-list";
    return (
      <ul className={block}>
        {_.keys(files).map(
          (path) => (
            <li key={path} className={classNames({
              [block + "__item"]: true,
              [block + "__item--current"]: path == current
            })}>
              <a href="#" onClick={this.handleClick.bind(this, path)}>{path}</a>
            </li>
        ))}
      </ul>
    );
  }

}

export default FileList;