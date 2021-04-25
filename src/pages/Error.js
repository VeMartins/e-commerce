import React from "react";
import { Link } from "react-router-dom";

import { ErrorModal } from "../components";
import { useProductContext } from "../context/products-context";
import "./Error.css";

const Error = () => {
  const { error, clearError } = useProductContext();
  return (
    <section>
      <ErrorModal
        header="Ooops! Nothing to see here."
        onClear={clearError}
        footer
        error={error}
        link={<Link to="/">Back to Home Page</Link>}
      />
    </section>
  );
};

export default Error;
