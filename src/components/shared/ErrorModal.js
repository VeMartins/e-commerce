import React from "react";

import { ErrorCard } from "../";

const ErrorModal = (props) => {
  return (
    <ErrorCard
      className={props.className}
      header={props.header}
      style={props.style}
      footer={
        <button className="btn-green-dark" onClick={props.onClear}>
          {props.linkText}
          {props.link}
        </button>
      }
    >
      <p>{props.error}</p>
    </ErrorCard>
  );
};

export default ErrorModal;
