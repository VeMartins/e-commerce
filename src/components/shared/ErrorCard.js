import React from "react";
import ReactDOM from "react-dom";

import "./ErrorCard.css";

const CardOverlay = (props) => {
  const content = (
    <div
      className={`error-card item-style ${props.className}`}
      style={props.style}
    >
      <header>
        <h2>{props.header}</h2>
      </header>
      <div>{props.children}</div>
      <footer>{props.footer}</footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ErrorCard = (props) => {
  return (
    <React.Fragment>
      <CardOverlay {...props} />
    </React.Fragment>
  );
};

export default ErrorCard;
