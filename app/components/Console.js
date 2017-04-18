import _ from 'underscore';
import React from 'react';

import OutputLine from 'components/OutputLine';
import ConsoleToolbar from 'components/ConsoleToolbar';
import ErrorLine from 'components/ErrorLine';

export default class Console extends React.Component {

  renderLine(line, i) {
    return <OutputLine 
              output={line} 
              key={i} />
  }
  
  render() {
    var block = "console",
        error = this.props.error;
    return (
      <div className={block}>
        <ConsoleToolbar
            className={block + "__toolbar"}
            onRun={this.props.onRun} />
        <div className={block + "__output"}>
          {this.props.lines.map(this.renderLine.bind(this))}
        </div>
        {error && <ErrorLine error={error} />}
      </div>
    );
  }

}
