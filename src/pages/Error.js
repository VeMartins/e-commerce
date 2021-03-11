import React from "react";
import { Link } from "react-router-dom";

import { ErrorModal } from "../components";
import { useGlobalContext } from "../context/context";
import "./Error.css";

const Error = () => {
  const { error, clearError } = useGlobalContext();
  return (
    <section>
      <ErrorModal
        header="Ooops! Nothing to see here."
        onClear={clearError}
        error={error}
        link={<Link to="/">Back to Home Page</Link>}
      />
    </section>
  );
};

export default Error;
