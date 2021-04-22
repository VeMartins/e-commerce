import React from "react";

import { ErrorCard } from "../";

const ErrorModal = (props) => {
  return (
    <ErrorCard
      className={props.className}
      header={props.header}
      style={props.style}
      footer={props.footer}
      onClear={props.onClear}
      linkText={props.linkText}
      link={props.link}
    >
      <p>{props.error}</p>
    </ErrorCard>
  );
};

export default ErrorModal;
