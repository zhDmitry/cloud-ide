import React from 'react';

export default class Header extends React.Component {

  render() {
    var block = "header",
        imagePath = "../images/logo.png";
    return (
      <header className={block}>
        <div className={block + "__logo"}>
          <a href="/">
            <img src={imagePath} width={50} height={50} />
          </a>
        </div>
        <div className={block + "__content"}>
          {this.props.children}
        </div>
      </header>
    );
  }

}
