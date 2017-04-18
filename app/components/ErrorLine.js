import React from 'react';

export default class ErrorLine extends React.Component {
  render() {
    let block = "console__error-line",
        error = this.props.error;

    return (
      <div className={block}>
        <p className={block + "__description"}>
          {error}
        </p>
      </div>
    );
  }
}
