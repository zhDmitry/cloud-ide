import React from 'react';
import {connect} from 'react-redux';

import {setPreference} from 'actions/preferences';
import {getExtension} from 'helpers';
import {byExtension} from 'interpreters';

class ConsoleToolbar extends React.Component {
  handleRunButton(event) {
    event.preventDefault();
    this.props.onRun();
  }

  handleLiveCodingCheckbox(event) {
    const checked = event.target.checked;
    const {dispatch} = this.props;

    dispatch(setPreference('liveCoding', checked));
  }

  render() {
    const block = this.props.className;
    const {preferences, currentFile} = this.props;
    const extension = getExtension(currentFile);
    const interpreterInfo = byExtension(extension);
    return (
      <div className={block}>
        <button
            className={block + "__run-button"}
            onClick={this.handleRunButton.bind(this)}>
          {String.fromCharCode(9654)}
        </button>
        <div className={block + "__interpreter-info"}>
          {interpreterInfo.description}
        </div>
        <label className={block + "__live-coding"}>
          <input
            onChange={this.handleLiveCodingCheckbox.bind(this)}
            checked={preferences.liveCoding}
            type="checkbox" />
          <span className={block + "__live-coding-text"}>Live coding</span>
        </label>
      </div>
    );
  }
}

function select(state) {
  return {
    preferences: state.preferences,
    currentFile: state.currentFile
  };
}

export default connect(select)(ConsoleToolbar);
