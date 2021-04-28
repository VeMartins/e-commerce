import React from "react";

import "./ErrorCard.css";

const CardOverlay = (props) => {
  return (
    <div
      className={`error-card item-style ${props.className}`}
      style={props.style}
    >
      <header>
        <h2>{props.header}</h2>
      </header>
      <div>{props.children}</div>
      {props.footer && (
        <footer>
          <button
            className={`${
              props.className ? "btn-red-light" : "btn-dark-green"
            }`}
            onClick={props.onClear}
          >
            {props.linkText}
            {props.link}
          </button>
        </footer>
      )}
    </div>
  );

  //return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ErrorCard = (props) => {
  return (
    <React.Fragment>
      <CardOverlay {...props} />
    </React.Fragment>
  );
};

export default ErrorCard;
