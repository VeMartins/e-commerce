import React from "react";
import { Link } from "react-router-dom";

import "./Error.css";

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Ooops! Nothing to see here.</h1>
        <Link to="/" className="btn btn-backhome btn-details">
          Home
        </Link>
      </div>
    </section>
  );
};

export default Error;
