import React from "react";

import { PageHeader } from "../";

import "./PageHeaderImage.css";

const PageHeaderImage = ({ title, src, link, colorStyle }) => {
  return (
    <header className="header-image-container">
      <div
        className={
          colorStyle ? "header-image_inner colorStyle" : "header-image_inner"
        }
      >
        <span className="header-image_span">
          {src && <img className="header-image2" src={src} alt="header" />}
          <div className="page-header-outer">
            <PageHeader title={title} link={link} />
          </div>
        </span>
      </div>
    </header>
  );
};
export default PageHeaderImage;
