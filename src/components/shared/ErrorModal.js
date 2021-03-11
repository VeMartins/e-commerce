import React from "react";
import { Link } from "react-router-dom";

import { ErrorCard } from "../";

const ErrorModal = (props) => {
  return (
    <ErrorCard
      header={props.header}
      footer={
        <button className="btn-details" onClick={props.onClear}>
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
