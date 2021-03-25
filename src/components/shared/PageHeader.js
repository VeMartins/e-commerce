import React from "react";
import { Link } from "react-router-dom";

import "./PageHeader.css";

const PageHeader = (props) => {
  const { title } = props;
  return (
    <div className="section-center-pageHeader">
      <h3>
        <Link to="/">Home</Link>/ {title}
      </h3>
    </div>
  );
};
export default PageHeader;
