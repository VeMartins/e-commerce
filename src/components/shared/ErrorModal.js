import React from "react";

import ErrorCard from "./ErrorCard";

const ErrorModal = (props) => {
  return (
    <ErrorCard
      header={props.header}
      footer={
        <button className="btn-details" onClick={props.onClear}>
          Okay
        </button>
      }
    >
      <p>{props.error}</p>
    </ErrorCard>
  );
};

export default ErrorModal;
