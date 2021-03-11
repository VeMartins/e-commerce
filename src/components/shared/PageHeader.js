import React from "react";
import { Link } from "react-router-dom";

import "./PageHeader.css";

const PageHeader = ({ title }) => {
  return (
    <section className="pageHeader-section">
      <div className="section-center-pageHeader">
        <h3>
          <Link to="/">Home</Link>/ {title}
        </h3>
      </div>
    </section>
  );
};
export default PageHeader;
