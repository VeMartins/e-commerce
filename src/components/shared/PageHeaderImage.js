import React from "react";

import { PageHeader } from "../";

import "./PageHeaderImage.css";

const PageHeaderImage = ({ title, src }) => {
  return (
    <header className="header-image-container">
      <div className="header-image_inner">
        <span className="header-image_span">
          <img className="header-image2" src={src} alt="header" />

          <div className="page-header-outer">
            <PageHeader title={title} />
          </div>
        </span>
      </div>
    </header>
  );
};
export default PageHeaderImage;
