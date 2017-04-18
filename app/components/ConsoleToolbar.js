import React from 'react';
import {connect} from 'react-redux';

import {setPreference} from 'actions/preferences';
import {getExtension} from 'helpers';
import {InterpreterInfo} from 'interpreters/constants';

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
    const interpreterInfo = InterpreterInfo[extension];
		return (
			<div className={block}>
        <button 
            className={block + "__run-button"}
            onClick={this.handleRunButton.bind(this)}>
          {String.fromCharCode(9654)}
        </button>
        <div className={block + "__interpreter-info"}>
          {interpreterInfo}
        </div>
        <label className={block + "__live-coding"}>
          <input 
            onChange={this.handleLiveCodingCheckbox.bind(this)}
            checked={preferences.liveCoding}
            type="checkbox" />
          Live coding
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
