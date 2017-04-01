import React from 'react';

import {parseType} from 'helpers';

import Chunk from 'components/Chunk';

class OutputLine extends React.Component {

  render() {
    var block = "console__output";
    return (
      <div className={block + "__line"}>
        {this.props.output.map(
          (chunk, i) => <Chunk key={i} chunk={chunk} />
        )}
      </div>
    );
  }

}

export default OutputLine;