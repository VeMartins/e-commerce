import React from "react";

import "./ConfirmationBox.css";

const ConfirmationBox = (props) => {
  return (
    <>
      <div className="confirm-container">
        <div className="confirmation-text">
          Do you really want to delete this product?
        </div>
        <div className="button-container">
          <button className="cancel-button" onClick={props.handleBox}>
            Cancel
          </button>
          <button className="confirmation-button" onClick={props.handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="confirm-bg" onClick={props.handleBox}></div>
    </>
  );
};

export default ConfirmationBox;
