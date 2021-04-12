import React from "react";

import "./PageHeader.css";

const PageHeader = (props) => {
  const { title, link } = props;
  return (
    <div className="section-center-pageHeader">
      <h3>
        {link} {title}
      </h3>
    </div>
  );
};
export default PageHeader;
