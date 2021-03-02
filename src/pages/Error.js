import React from "react";
import { Link } from "react-router-dom";

import ErrorModal from "../components/shared/ErrorModal";
import { useGlobalContext } from "../context/context";
import "./Error.css";

const Error = () => {
  const { error, clearError } = useGlobalContext();
  return (
    <section>
      {error && (
        <ErrorModal
          header="Ooops! Nothing to see here."
          onClear={clearError}
          error={error}
        />
      )}

      <div className="error-container">
        <Link to="/" className="btn btn-backhome btn-details">
          Back to Home Page
        </Link>
      </div>
    </section>
  );
};

export default Error;
